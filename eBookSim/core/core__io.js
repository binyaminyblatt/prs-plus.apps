// Name: IO
// Description: File IO related methods
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-21 kartu - Reformatted
//	2010-07-09 kartu - Renamed file so that it is loaded before other modules
//	2010-11-11 kartu - Added listFiles function
//	2010-11-30 kartu - Refactoring Core.stirng => Core.text
//	2010-11-30 kartu - Fixed nasty double-bug with getFileContent not working properly on 600 plus finally block hijacking control.

try {
	Core.io = {
		// Returns list of files in the directory. Accepts 0..*  extension arguments.
		//
		// Returns array of files with given extension sorted by name
		//
		listFiles : function(path, ext) {
			var iterator, items, item, p, i, n, endsWith;
			endsWith = Core.text.endsWith;
			items = [];
			try {
				if (FileSystem.getFileInfo(path)) {
					iterator = new FileSystem.Iterator(path);
					try {
						while (item = iterator.getNext()) {
							if (item.type == "file") {
								p = item.path;
								if (arguments.length > 1) {
									for (i = 1, n = arguments.length; i < n; i++) {
										if (endsWith(p, arguments[i])) {
											items.push(p);
											break;
										}
									}
								} else {
									items.push(p);
								}
							}
						}
						items.sort();
					} finally {
						iterator.close();
					}
				}
			} catch (e) {
				log.error("Error in list files, listing folder " + path, e);
			}
			return items;
		},
		
		// Returns content of the file <path> as a string.
		// If any kind of error happens (file doesn't exist, or is not readable etc) returns <defVal>
		//
		getFileContent: function (path, defVal) {
			var stream, result;
			try {
				stream = new Stream.File(path, 2);
				try {
					result = stream.toString();
				} finally {
					stream.close();
				}
			} catch (whatever) {
				return defVal;
			}
			return result;
		},
		
		// Sets content of the file <path> to <content>. If file exists it will be overwritten.
		//
		setFileContent: function (path, content) {
			var stream;
			try {
				if (FileSystem.getFileInfo(path)) {
					FileSystem.deleteFile(path);
				}
				stream = new Stream.File(path, 1);
				stream.writeString(content);
				stream.flush();
			} catch (e) {
				throw "in setFileContent: " + e;
			} finally {
				try {
					stream.close();
				} catch (ignore) {
				}
			}
		},
		
		// Copies file from <from> to <to>, deleting the target file first
		//
		// Arguments:
		//	from - source file
		//	to - target file
		//
		// Throws exceptions on errors. 
		copyFile: function (from, to) {
			if (FileSystem.getFileInfo(to)) {
				FileSystem.deleteFile(to);
			}
			//FileSystem.copyFile(from, to);
			// Copy/paste from FileSystem.copyFile, slightly modified (removed progress)
			var s, d, c, len, totalLen, copied;
			try {
				s = new Stream.File(from, 2);
				d = new Stream.File(to, 3);
				len = 128 * 1024;
				copied = 0;
				totalLen = s.bytesAvailable;
				c = new Chunk(len);
				while (s.readChunk(len, c)) {
					copied += c.length;
					d.writeChunk(c);
				}
				if (copied !== totalLen) {
					throw "Error copying " + from + " to " + to;
				}
			} finally {
				if (c) {
					c.free();
				}
				if (s) {
					s.close();
				}
				if (d) {
					d.close();
				}
			}
		}
	};
} catch (e) {
	log.error("initializing core-io", e);
}