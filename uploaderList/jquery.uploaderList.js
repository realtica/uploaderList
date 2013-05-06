(function($) {
	
	// ////////MODEL/////////////
	var settings;
	var count = -1;
	$("#file").bind("change", function(e) {
		
		settings.files = e.target.files;
		for ( var i = 0; i < settings.files.length; i++) {
			console.dir(settings.files[i]);
			upload = settings.files[i];
			count++;
			upload.count = count;
			methods.uploadFile(upload);
		}
	});
	var methods = {
		init : function(options) {
			
			return this.each(function() {
				
				settings = $.extend({
					activeUploads : 0,
					simultaneousUploads : 1,
					inputField : 'file',
					uploadsQueue : [],
					noop : function() {
					}
				}, options);
			});
		},
		
		appendData:function(data){
			return this.each(function() {
				
				settings = $.extend(settings, data);
			});
		},
		
		options : function() {
			return settings;
		},
		destroy : function() {
			
			return this.each(function() {
				
				var $this = $(this), data = $this.data('uploadlist');
				
				// Namespacing FTW
				$(window).unbind('.uploadlist');
				data.uploadlist.remove();
				$this.removeData('uploadlist');
				
			});
			
		},
		
		OnFileAdded : function(file) {
			console.log("Archivo agregado: " + file.name);
			
			viewModel.model.push({
				file_name : file.name,
				progress : ko.observable(0),
				loaded : ko.observable(0),
				total : ko.observable(0)
			});
			
		},
		OnStart : function(filename) {
			console.log("Upload Start: " + filename);
		},
		OnProgress : function(total, loaded, index, file_name) {
			var obj = {
				file_name : file_name + ": ",
				progress : (loaded / total) * 100,
				loaded : getSize(loaded),
				total : getSize(total)
			};
			viewModel.model.replace(viewModel.model()[index], obj);
			
			console.log("PROGRESS: " + obj.progress + "|" + loaded + "/" + total);
		},
		OnCompleted : function() {
			
		},
		uploadFile : function(upload) {
			// var manager = this.options();
			
			methods.OnFileAdded(upload);
			
			// Queue upload if maximum simultaneous uploads reached:
			if (settings.activeUploads === settings.simultaneousUploads) {
				console.log('Queue upload: ' + upload.name);
				settings.uploadsQueue.push(upload);
				return;
			}
			
			methods.ajaxUpload(upload);
		},
		ajaxUpload : function(upload) {
			var xhr, formData, prop, data = settings.data, key = settings.key || 'file', index;
			index = upload.count;
			console.log('Beging upload: ' + upload.name);
			settings.activeUploads += 1;
			
			xhr = new window.XMLHttpRequest();
			
			formData = new window.FormData();
			
			xhr.open('POST', settings.url);
			
			// Triggered when upload starts:
			xhr.upload.onloadstart = function() {
				// File size is not reported during start!
				console.log('Upload started: ' + upload.name);
				methods.OnStart(upload.name);
			};
			
			// Triggered many times during upload:
			xhr.upload.onprogress = function(event) {
				// console.dir(event);
				if (!event.lengthComputable) {
					return;
				}
				
				// Update file size because it might be bigger than reported by
				// the fileSize:
				console.log("File: " + index);
				methods.OnProgress(event.total, event.loaded, index, upload.name);
			};
			
			// Triggered when upload is completed:
			xhr.onload = function(event) {
				console.log('Upload completed: ' + upload.name);
				
				// Reduce number of active uploads:
				settings.activeUploads -= 1;
				
				methods.OnCompleted(event.target.responseText);
				
				// Check if there are any uploads left in a queue:
				if (settings.uploadsQueue.length) {
					methods.ajaxUpload(settings.uploadsQueue.shift());
				}
			};
			
			// Triggered when upload fails:
			xhr.onerror = function() {
				console.log('Upload failed: ', upload.name);
			};
			
			// Append additional data if provided:
			if (data) {
				for (prop in data) {
					if (data.hasOwnProperty(prop)) {
						console.log('Adding data: ' + prop + ' = ' + data[prop]);
						formData.append(prop, data[prop]);
					}
				}
			}
			// Append file data:
			formData.append(key, upload);
			// Initiate upload:
			xhr.send(formData);
		}
	};
	
	$.fn.uploadlist = function(method) {
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			console.log('Method ' + method + ' does not exist on jQuery.uploadlist');
		}
		
	};
	// ////////MODEL/////////////
	// ////////VIEW-MODEL/////////////
	var viewModel = {
		model : ko.observableArray([])
	};
	
	// Define a new knockout binding to update any progress bar.
	ko.bindingHandlers.updateProgress = {
		update : function(element, valueAccessor) {
			$(element).progressbar();
			var value = ko.utils.unwrapObservable(valueAccessor());
			$(element).progressbar('option', 'value', value);
		}
	};
	ko.applyBindings(viewModel);
	// ////////VIEW-MODEL/////////////
	// /////////HELPERS////////////////
	function getSize(bytes) {
		var sizes = [ 'n/a', 'bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB' ];
		var i = +Math.floor(Math.log(bytes) / Math.log(1024));
		return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + ' ' + sizes[isNaN(bytes) ? 0 : i + 1];
	}
	// /////////HELPERS////////////////
})(jQuery);