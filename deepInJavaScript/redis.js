Redis.prototype.connect = function (callback) {
    var Promise = PromiseContainer.get();
    var promise = new Promise(function (resolve, reject) {
      if (this.status === 'connecting' || this.status === 'connect' || this.status === 'ready') {
        reject(new Error('Redis is already connecting/connected'));
        return;
      }
      this.setStatus('connecting');
  
      const {options} = this;
  
      this.condition = {
        select: options.db,
        auth: options.password,
        subscriber: false
      };
  
      var _this = this;
      this.connector.connect(function (err, stream) {
        if (err) {
          _this.flushQueue(err);
          _this.silentEmit('error', err);
          reject(err);
          _this.setStatus('end');
          return;
        }
        var CONNECT_EVENT = options.tls ? 'secureConnect' : 'connect';
        if (options.sentinels && !options.enableTLSForSentinelMode) {
          CONNECT_EVENT = 'connect';
        }
  
        _this.stream = stream;
        if (typeof options.keepAlive === 'number') {
          stream.setKeepAlive(true, options.keepAlive);
        }
  
        stream.once(CONNECT_EVENT, eventHandler.connectHandler(_this));
        stream.once('error', eventHandler.errorHandler(_this));
        stream.once('close', eventHandler.closeHandler(_this));
        stream.on('data', eventHandler.dataHandler(_this));
  
        if (options.connectTimeout) {
          /*
           * Typically, Socket#setTimeout(0) will clear the timer
           * set before. However, in some platforms (Electron 3.x~4.x),
           * the timer will not be cleared. So we introduce a variable here.
           *
           * See https://github.com/electron/electron/issues/14915
           */
          var connectTimeoutCleared = false;
          stream.setTimeout(options.connectTimeout, function () {
            if (connectTimeoutCleared) {
              return;
            }
            stream.setTimeout(0);
            stream.destroy();
  
            var err = new Error('connect ETIMEDOUT');
            err.errorno = 'ETIMEDOUT';
            err.code = 'ETIMEDOUT';
            err.syscall = 'connect';
            eventHandler.errorHandler(_this)(err);
          });
          stream.once(CONNECT_EVENT, function () {
            connectTimeoutCleared = true;
            stream.setTimeout(0);
          });
        }
  
        if (options.noDelay) {
          stream.setNoDelay(true);
        }
  
        var connectionReadyHandler = function () {
          _this.removeListener('close', connectionCloseHandler);
          resolve();
        };
        var connectionCloseHandler = function () {
          _this.removeListener('ready', connectionReadyHandler);
          reject(new Error(utils.CONNECTION_CLOSED_ERROR_MSG));
        };
        _this.once('ready', connectionReadyHandler);
        _this.once('close', connectionCloseHandler);
      }, function (type, err) {
        _this.silentEmit(type, err);
      });
    }.bind(this))
  
    return asCallback(promise, callback)
  };