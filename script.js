(function(){
    var script = {
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "children": [
  "this.MainViewer",
  "this.Container_807F782A_8E23_A905_41DE_623121285A09",
  "this.Container_82CEEC30_9220_D3AB_41D9_A91DB817BCCC",
  "this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472",
  "this.Container_8A3F064F_9747_905B_41D4_9169FB3EB41E",
  "this.Image_E75D7FB5_F538_3297_41CA_C93BFF557E4D"
 ],
 "class": "Player",
 "borderSize": 0,
 "paddingRight": 0,
 "vrPolyfillScale": 0.85,
 "borderRadius": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "minHeight": 20,
 "propagateClick": false,
 "scripts": {
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "existsKey": function(key){  return key in window; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getKey": function(key){  return window[key]; }
 },
 "defaultVRPointer": "laser",
 "scrollBarMargin": 2,
 "downloadEnabled": false,
 "buttonToggleFullscreen": "this.IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA",
 "minWidth": 20,
 "contentOpaque": false,
 "verticalAlign": "top",
 "paddingTop": 0,
 "layout": "absolute",
 "buttonToggleMute": "this.IconButton_8105A313_8E22_BF0B_41E1_331C6035A930",
 "gap": 10,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "mouseWheelEnabled": true,
 "data": {
  "name": "Player463"
 },
 "overflow": "visible",
 "shadow": false,
 "definitions": [{
 "hfov": 360,
 "label": "7. 360 PUENTE - CASA SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465"
  }
 ],
 "thumbnailUrl": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_t.jpg",
 "id": "panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_F4B28162_E53C_AA9B_41DD_0497F8361C88",
  "this.overlay_F4B24162_E53C_AA9B_41EA_A31DD30E95FE",
  "this.overlay_F4B23162_E53C_AA9B_41E3_A2C1B12BE093",
  "this.overlay_F4B22163_E53C_AA99_41CA_920B372A0320",
  "this.overlay_F4B21163_E53C_AA99_41E4_585440F0218A"
 ]
},
{
 "duration": 5000,
 "label": "1. EXT 1 - CABA\u00d1A VT1",
 "id": "photo_7A1D2634_714C_3CEE_41D0_EA423895C904",
 "thumbnailUrl": "media/photo_7A1D2634_714C_3CEE_41D0_EA423895C904_t.jpg",
 "width": 160,
 "image": {
  "levels": [
   {
    "url": "media/photo_7A1D2634_714C_3CEE_41D0_EA423895C904.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 80
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -43.47,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F38EFDD7_E0A3_C486_41C4_60BC7E0E4CCA",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A",
   "camera": "this.panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A",
   "camera": "this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE",
   "camera": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2",
   "camera": "this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58",
   "camera": "this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574",
   "camera": "this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4",
   "camera": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465",
   "camera": "this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962",
   "camera": "this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906",
   "camera": "this.panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64",
   "camera": "this.panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2",
   "camera": "this.panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7",
   "camera": "this.panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "duration": 5000,
 "label": "3. EXT 3 - CABA\u00d1A VT1",
 "id": "photo_7B6E1B33_714C_34EA_41CD_F7D6937C7469",
 "thumbnailUrl": "media/photo_7B6E1B33_714C_34EA_41CD_F7D6937C7469_t.jpg",
 "width": 1600,
 "image": {
  "levels": [
   {
    "url": "media/photo_7B6E1B33_714C_34EA_41CD_F7D6937C7469.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 800
},
{
 "fontFamily": "Arial",
 "backgroundColor": "#404040",
 "selectedFontColor": "#FFFFFF",
 "children": [
  {
   "label": "360 ACCESO",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  },
  {
   "label": "360 UMBRAL",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  },
  {
   "label": "360 HALL ACCESO - CASA SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  },
  {
   "label": "360 TERRAZA - CASA SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  },
  {
   "label": "360 SALA - CASA SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  },
  {
   "label": "6. 360 COCINA - CASA SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  },
  {
   "label": "7. 360 PUENTE - CASA SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  },
  {
   "label": "8. 360 PPAL - CASA SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  },
  {
   "label": "9. 360 VALERIA - CASA SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  },
  {
   "label": "10. 360 BAÑO PPAL SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  },
  {
   "label": "11. 360 BAÑO valeria SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  },
  {
   "label": "12. 360 SIMULADOR SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  },
  {
   "label": "13. 360 SALON TV SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  },
  {
   "label": "14. 360 VESTIER PPAL SE77E",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": "#000000",
 "id": "Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "rollOverFontColor": "#FFFFFF",
 "label": "Media",
 "opacity": 0.4,
 "class": "Menu",
 "rollOverOpacity": 0.8,
 "selectedBackgroundColor": "#202020"
},
{
 "hfov": 360,
 "label": "11. 360 BA\u00d1O valeria SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962"
  }
 ],
 "thumbnailUrl": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_t.jpg",
 "id": "panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_F904184E_F4F1_3B0C_41DE_14A9B057AC99"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 101.55,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3518E4A_E0A3_C78E_41E8_F6A2656FA528",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -60.16,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F39F6DE2_E0A3_C4BE_41CF_8161D6CFB9A7",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "12. 360 SIMULADOR SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4"
  }
 ],
 "thumbnailUrl": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_t.jpg",
 "id": "panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ECFF4BA2_E062_CCBE_41BB_83F6A29584DB"
 ]
},
{
 "hfov": 360,
 "label": "6. 360 COCINA - CASA SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE"
  }
 ],
 "thumbnailUrl": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_t.jpg",
 "id": "panorama_ECA3438E_E06E_5C87_41D6_9347C7940574",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EE4AFF08_E06E_C58A_41CC_390070703324",
  "this.overlay_F03CBD9A_E062_C48F_41E8_210B5948B67F",
  "this.overlay_F0C3DDF2_E067_C49E_41A8_B03AD45EB547"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -167.57,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F31CCE29_E0A3_C78A_41D7_DC71CB0A9340",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -21.74,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3C43DF9_E0A3_C48A_41C5_BFFB223CEF01",
 "automaticZoomSpeed": 10
},
{
 "gyroscopeEnabled": true,
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_acceleration",
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": false,
 "mouseControlMode": "drag_rotation"
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -125.34,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F32DAE2F_E0A3_C786_41E2_6C206DF25BD3",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0.08,
  "pitch": 1.53
 },
 "class": "PanoramaCamera",
 "id": "panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -179.66,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F213AD9F_E0A3_C486_41E6_F06586867B61",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -5.08,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F2471DB0_E0A3_C49A_41DC_A8634EE2BDF5",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 41.49,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F4BBEE78_E0A3_C78A_41E9_9D62599356B4",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -177.47,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F4DD7E83_E0A3_C77E_41E9_67BAB651510F",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -126.46,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3F9BE19_E0A3_C78A_41D0_82B72ADD21A7",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 20.14,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F33E7E3A_E0A3_C78E_41D8_2E56C121A0FF",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 147.94,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3637E4F_E0A3_C786_41C7_ADF916175965",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "2. EXT 2 - CABA\u00d1A VT1",
 "id": "photo_7A6C466E_714D_DD7A_41CB_FFB743A9431B",
 "thumbnailUrl": "media/photo_7A6C466E_714D_DD7A_41CB_FFB743A9431B_t.jpg",
 "width": 1600,
 "image": {
  "levels": [
   {
    "url": "media/photo_7A6C466E_714D_DD7A_41CB_FFB743A9431B.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 800
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 116.63,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3E8FE13_E0A3_C79E_41EA_1EF720D329BE",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "7. INT 3- CABA\u00d1A VT1",
 "id": "photo_AE142674_A532_5519_4186_6BD1632B5132",
 "thumbnailUrl": "media/photo_AE142674_A532_5519_4186_6BD1632B5132_t.jpg",
 "width": 8000,
 "image": {
  "levels": [
   {
    "url": "media/photo_AE142674_A532_5519_4186_6BD1632B5132.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 4000
},
{
 "duration": 5000,
 "label": "5. INT 2 - CABA\u00d1A VT1",
 "id": "photo_AF3726A9_A536_550B_41D6_3AAEFE9F4427",
 "thumbnailUrl": "media/photo_AF3726A9_A536_550B_41D6_3AAEFE9F4427_t.jpg",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_AF3726A9_A536_550B_41D6_3AAEFE9F4427.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2200
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -129.5,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F4974E68_E0A3_C78A_41E8_2AB8FF428461",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "9. 360 VALERIA - CASA SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64"
  }
 ],
 "thumbnailUrl": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_t.jpg",
 "id": "panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ECFAC7CD_E062_C48A_41E9_25787A0FBBA6",
  "this.overlay_ECFAF7CD_E062_C48A_41E3_AD383F1B378E"
 ]
},
{
 "duration": 5000,
 "label": "6. EXT 4 - CABA\u00d1A VT1",
 "id": "photo_AFED67EC_A532_5309_41E0_15CD3B689BE6",
 "thumbnailUrl": "media/photo_AFED67EC_A532_5309_41E0_15CD3B689BE6_t.jpg",
 "width": 8000,
 "image": {
  "levels": [
   {
    "url": "media/photo_AFED67EC_A532_5309_41E0_15CD3B689BE6.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 4000
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -47.57,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3A05DE8_E0A3_C48A_41E9_793CADF26050",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "4. INT 1 - CABA\u00d1A VT1",
 "id": "photo_AE184A6F_A536_5D07_41E2_B206782F0C19",
 "thumbnailUrl": "media/photo_AE184A6F_A536_5D07_41E2_B206782F0C19_t.jpg",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/photo_AE184A6F_A536_5D07_41E2_B206782F0C19.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 2200
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 121.67,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F26B2DC7_E0A3_C486_41E8_6D59DAC353BE",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "360 UMBRAL",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE"
  }
 ],
 "thumbnailUrl": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_t.jpg",
 "id": "panorama_FB0BD302_F571_EEF7_41C5_3444250D104A",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FB0BC302_F571_EEF7_41C1_8A08C1E81CB9",
  "this.overlay_FB0BB302_F571_EEF7_41E0_A9E4C0E9CEC6"
 ]
},
{
 "hfov": 360,
 "label": "360 SALA - CASA SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE"
  }
 ],
 "thumbnailUrl": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_t.jpg",
 "id": "panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_E52802D7_F570_EF1C_41D8_1B1FB1AE3FEF",
  "this.overlay_E52812D7_F570_EF1C_41E6_168EAC089430",
  "this.overlay_F0EDA3F1_E066_DC9A_41C9_A46A8163F6FD"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -4.92,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F2240DA5_E0A3_C4BA_41D4_CF446213EC9C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 158.29,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F236FDAB_E0A3_C48E_41D3_EDF9A0B3215A",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -154.95,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3E78E09_E0A3_C78A_41E4_A5EDCC3B0A32",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist",
 "items": [
  {
   "media": "this.panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A",
   "camera": "this.panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A",
   "camera": "this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE",
   "camera": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2",
   "camera": "this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58",
   "camera": "this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574",
   "camera": "this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4",
   "camera": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465",
   "camera": "this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962",
   "camera": "this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906",
   "camera": "this.panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64",
   "camera": "this.panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2",
   "camera": "this.panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7",
   "camera": "this.panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF",
   "camera": "this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 13, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 68.1,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F340DE3F_E0A3_C786_41EB_439B188B1DB0",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -45.93,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F4983E6D_E0A3_C78A_41E4_E57178951EC6",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 147.42,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F30A2E23_E0A3_C7BE_41E7_1F7B9E310867",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -98.09,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F25A1DC1_E0A3_C4FA_41D8_CC39EF73BEC0",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -83.89,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3741E5A_E0A3_C78E_41CB_0162CE96D45A",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -4.72,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F4A93E73_E0A3_C79E_41D3_45F16B6A25AC",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "360 TERRAZA - CASA SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE"
  }
 ],
 "thumbnailUrl": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_t.jpg",
 "id": "panorama_F9F94787_F4CF_55FB_41ED_D689512520E2",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_F9F99788_F4CF_55F4_41DF_6360EE1B33D0",
  "this.overlay_F9F98788_F4CF_55F4_41E2_4A911A5E9FF7",
  "this.overlay_F06D3FF9_E062_C48A_41CB_210372186562"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0.35,
  "pitch": 1.32
 },
 "class": "PanoramaCamera",
 "id": "panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -151.04,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3B34DF3_E0A3_C49E_41E2_781B73BBA899",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 7.4,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F2499DBC_E0A3_C48A_41E0_CE4C3120ABD9",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "360 HALL ACCESO - CASA SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A"
  }
 ],
 "thumbnailUrl": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_t.jpg",
 "id": "panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FB0E6254_F4F3_2F1C_41C0_0AB91B3366D0",
  "this.overlay_FB0F9254_F4F3_2F1C_41D1_0847A0EF0B34",
  "this.overlay_FB0FB254_F4F3_2F1C_41E2_4FC0EA0DAAA7",
  "this.overlay_FB0FD254_F4F3_2F1C_41D3_6FAF22634F92",
  "this.overlay_EFD1B175_E06D_BD9A_41E6_B42095408F28"
 ]
},
{
 "hfov": 360,
 "label": "10. 360 BA\u00d1O PPAL SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF"
  }
 ],
 "thumbnailUrl": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_t.jpg",
 "id": "panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EAA90BE0_E4EF_9D97_41D4_7F747DE82C27"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 60.56,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F27DCDD2_E0A3_C49E_41EA_93C28A7E84F2",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "14. 360 VESTIER PPAL SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465"
  }
 ],
 "thumbnailUrl": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_t.jpg",
 "id": "panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_F5DB745C_E52C_EAA8_41D6_B5F4FF5996C8",
  "this.overlay_F78986B3_E52F_B7F9_41DE_9A5A13027ACB"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -90,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F4CCBE7E_E0A3_C786_41E3_81C924D86685",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "8. 360 PPAL - CASA SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4"
  }
 ],
 "thumbnailUrl": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_t.jpg",
 "id": "panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2D001649_3F86_BC7C_41CD_CF6FC2596233",
  "this.overlay_F4FC1DF9_E4EB_9569_41B2_D6DCD1BFB099"
 ]
},
{
 "hfov": 360,
 "label": "13. 360 SALON TV SE77E",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4"
  }
 ],
 "thumbnailUrl": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_t.jpg",
 "id": "panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ECA7111B_E06E_FD8D_41EB_7F923A2E999C"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": 35.41,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F3D69E03_E0A3_C77E_41E9_5682419B636D",
 "automaticZoomSpeed": 10
},
{
 "hfov": 360,
 "label": "360 ACCESO",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A"
  }
 ],
 "thumbnailUrl": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_t.jpg",
 "id": "panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A",
 "cardboardMenu": "this.Menu_F2FD0D91_E0A3_C49A_41E9_57810B252441",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 100,
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EC6F24B7_E062_4486_41CB_08B4E99572CC"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "class": "PanoramaCameraPosition",
  "yaw": -52.23,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_F4868E60_E0A3_C7BA_41EB_3019A42956E2",
 "automaticZoomSpeed": 10
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 14,
 "toolTipBorderSize": 0,
 "id": "MainViewer",
 "left": 0,
 "toolTipPaddingTop": 9,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 14,
 "width": "100%",
 "class": "ViewerArea",
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "toolTipBorderRadius": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "minHeight": 50,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "minWidth": 100,
 "playbackBarBottom": 5,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "toolTipOpacity": 0.7,
 "toolTipFontSize": 13,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipPaddingBottom": 9,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipTextShadowHorizontalLength": 0,
 "toolTipTextShadowVerticalLength": 0,
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "scrollBarWidth": 10,
 "id": "Container_807F782A_8E23_A905_41DE_623121285A09",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "width": "22.545%",
 "children": [
  "this.Container_80D3CF90_8E26_E705_41E0_E47025A2C106"
 ],
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "right": 25,
 "borderRadius": 5,
 "paddingLeft": 0,
 "minHeight": 50,
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "89%",
 "bottom": "3%",
 "contentOpaque": false,
 "minWidth": 265,
 "scrollBarMargin": 2,
 "gap": 1,
 "paddingTop": 0,
 "layout": "horizontal",
 "horizontalAlign": "right",
 "paddingBottom": 0,
 "data": {
  "name": "--Settings Button Set"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "scrollBarWidth": 10,
 "id": "Container_82CEEC30_9220_D3AB_41D9_A91DB817BCCC",
 "left": "2.14%",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "width": "21%",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "minHeight": 120,
 "propagateClick": false,
 "top": "3.5%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 300,
 "verticalAlign": "top",
 "height": "25%",
 "gap": 10,
 "paddingTop": 0,
 "layout": "vertical",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "--Stickers Container"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "maxWidth": 150,
 "id": "ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472",
 "itemLabelFontStyle": "normal",
 "scrollBarOpacity": 1,
 "scrollBarColor": "#52B7EF",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "right": "2%",
 "itemLabelHorizontalAlign": "center",
 "class": "ThumbnailList",
 "selectedItemBackgroundColorRatios": [],
 "itemThumbnailOpacity": 1,
 "borderRadius": 3,
 "paddingLeft": 15,
 "minHeight": 1,
 "itemPaddingRight": 3,
 "selectedItemBorderRadius": 0,
 "itemBorderRadius": 0,
 "itemLabelFontFamily": "Arial",
 "selectedItemThumbnailShadowBlurRadius": 10,
 "minWidth": 1,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingLeft": 3,
 "itemLabelPosition": "bottom",
 "verticalAlign": "top",
 "itemBackgroundOpacity": 0,
 "itemHorizontalAlign": "center",
 "rollOverItemLabelTextDecoration": "underline",
 "height": "82.127%",
 "selectedItemLabelFontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "itemOpacity": 1,
 "itemThumbnailBorderRadius": 50,
 "itemThumbnailWidth": 80,
 "itemBackgroundColor": [],
 "itemPaddingTop": 3,
 "selectedItemBorderSize": 0,
 "itemBackgroundColorRatios": [],
 "shadow": false,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "selectedItemBackgroundColor": [],
 "rollOverItemLabelFontWeight": "bold",
 "backgroundOpacity": 0.25,
 "selectedItemThumbnailShadow": true,
 "borderSize": 0,
 "paddingRight": 15,
 "itemLabelTextDecoration": "none",
 "selectedItemBackgroundOpacity": 0,
 "selectedItemLabelFontSize": 12,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "selectedItemLabelFontStyle": "italic",
 "propagateClick": false,
 "rollOverItemLabelFontColor": "#FFFFFF",
 "selectedItemLabelTextDecoration": "underline",
 "top": "3.5%",
 "playList": "this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist",
 "scrollBarMargin": 4,
 "itemLabelFontSize": 12,
 "selectedItemThumbnailShadowOpacity": 0.73,
 "itemVerticalAlign": "middle",
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "itemThumbnailHeight": 80,
 "paddingTop": 20,
 "gap": 10,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemBackgroundColorDirection": "vertical",
 "layout": "vertical",
 "itemThumbnailShadow": false,
 "paddingBottom": 20,
 "itemPaddingBottom": 3,
 "itemLabelGap": 9,
 "data": {
  "name": "-ThumbnailList"
 },
 "scrollBarWidth": 7,
 "visible": false
},
{
 "scrollBarWidth": 10,
 "id": "Container_8A3F064F_9747_905B_41D4_9169FB3EB41E",
 "left": "2%",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "width": "37.394%",
 "children": [
  "this.Container_8BEA9761_974D_B047_41DA_8D05A7FEFD9B"
 ],
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "propagateClick": false,
 "verticalAlign": "bottom",
 "bottom": "3%",
 "contentOpaque": false,
 "minWidth": 1,
 "height": 92,
 "scrollBarMargin": 2,
 "gap": 1,
 "paddingTop": 0,
 "layout": "vertical",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "-Discover Container"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "maxHeight": 265,
 "maxWidth": 485,
 "id": "Image_E75D7FB5_F538_3297_41CA_C93BFF557E4D",
 "backgroundOpacity": 0,
 "width": "5%",
 "right": "0.6%",
 "class": "Image",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_E75D7FB5_F538_3297_41CA_C93BFF557E4D.png",
 "borderRadius": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "propagateClick": false,
 "top": "0.98%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "5%",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "Image21736"
 },
 "shadow": false,
 "scaleMode": "fit_inside"
},
{
 "transparencyActive": true,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingRight": 14,
 "maxHeight": 70,
 "maxWidth": 70,
 "id": "IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA.png",
 "toolTipBorderSize": 0,
 "toolTipPaddingLeft": 14,
 "toolTipPaddingTop": 9,
 "width": "17.48%",
 "class": "IconButton",
 "toolTipDisplayTime": 600,
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA_pressed.png",
 "paddingLeft": 0,
 "toolTipBorderRadius": 1,
 "minHeight": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTip": "Full Screen",
 "toolTipFontFamily": "Arial",
 "verticalAlign": "middle",
 "toolTipShadowSpread": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": "76.75%",
 "toolTipBorderColor": "#767676",
 "toolTipOpacity": 0.7,
 "toolTipFontSize": 13,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "toolTipShadowOpacity": 0,
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowColor": "#000000",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "toolTipFontColor": "#FFFFFF",
 "shadow": false,
 "toolTipTextShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 9,
 "data": {
  "name": "Icon fullscreen"
 },
 "toolTipFontWeight": "normal",
 "cursor": "hand",
 "toolTipTextShadowVerticalLength": 0
},
{
 "transparencyActive": true,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingRight": 14,
 "maxHeight": 70,
 "maxWidth": 70,
 "id": "IconButton_8105A313_8E22_BF0B_41E1_331C6035A930",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_8105A313_8E22_BF0B_41E1_331C6035A930.png",
 "toolTipBorderSize": 0,
 "toolTipPaddingLeft": 14,
 "toolTipPaddingTop": 9,
 "width": "17.15%",
 "class": "IconButton",
 "toolTipDisplayTime": 600,
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_8105A313_8E22_BF0B_41E1_331C6035A930_pressed.png",
 "paddingLeft": 0,
 "toolTipBorderRadius": 1,
 "minHeight": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTip": "Audio On/Off",
 "toolTipFontFamily": "Arial",
 "verticalAlign": "middle",
 "toolTipShadowSpread": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": "76.75%",
 "toolTipBorderColor": "#767676",
 "toolTipOpacity": 0.7,
 "toolTipFontSize": 13,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "toolTipShadowOpacity": 0,
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowColor": "#000000",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "toolTipFontColor": "#FFFFFF",
 "shadow": false,
 "toolTipTextShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 9,
 "data": {
  "name": "Icon audio"
 },
 "toolTipFontWeight": "normal",
 "cursor": "hand",
 "toolTipTextShadowVerticalLength": 0
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.23,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.58,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 90
  }
 ],
 "id": "overlay_F4B28162_E53C_AA9B_41DD_0497F8361C88",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE, this.camera_F25A1DC1_E0A3_C4FA_41D8_CC39EF73BEC0); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.15,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -63.37
  }
 ],
 "id": "overlay_F4B24162_E53C_AA9B_41EA_A31DD30E95FE",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465, this.camera_F38EFDD7_E0A3_C486_41C4_60BC7E0E4CCA); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -63.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0_HS_2_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.82,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 54.66
  }
 ],
 "id": "overlay_F4B23162_E53C_AA9B_41E3_A2C1B12BE093",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962, this.camera_F2499DBC_E0A3_C48A_41E0_CE4C3120ABD9); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 54.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0_HS_3_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.62,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -144.59
  }
 ],
 "id": "overlay_F4B22163_E53C_AA99_41CA_920B372A0320",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2, this.camera_F27DCDD2_E0A3_C49E_41EA_93C28A7E84F2); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -144.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_1_HS_4_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.49,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 119.84
  }
 ],
 "id": "overlay_F4B21163_E53C_AA99_41E4_585440F0218A",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7, this.camera_F26B2DC7_E0A3_C486_41E8_6D59DAC353BE); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 119.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.45,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -159.86
  }
 ],
 "id": "overlay_F904184E_F4F1_3B0C_41DE_14A9B057AC99",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962, this.camera_F3A05DE8_E0A3_C48A_41E9_793CADF26050); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.2,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -119.44
  }
 ],
 "id": "overlay_ECFF4BA2_E062_CCBE_41BB_83F6A29584DB",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4, this.camera_F3D69E03_E0A3_C77E_41E9_5682419B636D); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -119.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECFF6BA2_E062_CCBE_41DE_925D594612C2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.41,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.5,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 134.07
  }
 ],
 "id": "overlay_EE4AFF08_E06E_C58A_41CC_390070703324",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE, this.camera_F3637E4F_E0A3_C786_41C7_ADF916175965); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.63,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 53.54
  }
 ],
 "id": "overlay_F03CBD9A_E062_C48F_41E8_210B5948B67F",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2, this.camera_F340DE3F_E0A3_C786_41EB_439B188B1DB0); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 53.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_1_HS_2_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.95,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 96.11
  }
 ],
 "id": "overlay_F0C3DDF2_E067_C49E_41A8_B03AD45EB547",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58, this.camera_F3518E4A_E0A3_C78E_41E8_F6A2656FA528); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA3438E_E06E_5C87_41D6_9347C7940574_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.95
  }
 ]
},
{
 "transparencyActive": false,
 "maxHeight": 70,
 "maxWidth": 70,
 "id": "IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37.png",
 "width": "17.15%",
 "class": "IconButton",
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "height": "76.75%",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "IconButton8475"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_1_HS_0_0.png",
      "width": 115,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.58,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -172.6
  }
 ],
 "id": "overlay_ECFAC7CD_E062_C48A_41E9_25787A0FBBA6",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4, this.camera_F32DAE2F_E0A3_C786_41E2_6C206DF25BD3); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -172.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_1_HS_1_0.png",
      "width": 115,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.69,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 132.43
  }
 ],
 "id": "overlay_ECFAF7CD_E062_C48A_41E3_AD383F1B378E",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F905F84E_F4F1_3B0C_41E0_076D2B3B4B64, this.camera_F33E7E3A_E0A3_C78E_41D8_2E56C121A0FF); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 132.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECFAD7CD_E062_C48A_41EB_265ADE137962_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_1_HS_7_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.45,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 174.92
  }
 ],
 "id": "overlay_FB0BC302_F571_EEF7_41C1_8A08C1E81CB9",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A, this.camera_F213AD9F_E0A3_C486_41E6_F06586867B61); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_1_HS_8_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.83,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 2.53
  }
 ],
 "id": "overlay_FB0BB302_F571_EEF7_41E0_A9E4C0E9CEC6",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE, this.camera_F2240DA5_E0A3_C4BA_41D4_CF446213EC9C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0BD302_F571_EEF7_41C5_3444250D104A_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -32.58
  }
 ],
 "id": "overlay_E52802D7_F570_EF1C_41D8_1B1FB1AE3FEF",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2, this.camera_F4868E60_E0A3_C7BA_41EB_3019A42956E2); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -32.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -138.51
  }
 ],
 "id": "overlay_E52812D7_F570_EF1C_41E6_168EAC089430",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE, this.camera_F4974E68_E0A3_C78A_41E8_2AB8FF428461); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -138.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0_HS_2_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.36,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -78.45
  }
 ],
 "id": "overlay_F0EDA3F1_E066_DC9A_41C9_A46A8163F6FD",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574, this.camera_F3741E5A_E0A3_C78E_41CB_0162CE96D45A); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.42,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.43,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 127.77
  }
 ],
 "id": "overlay_F9F99788_F4CF_55F4_41DF_6360EE1B33D0",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58, this.camera_F30A2E23_E0A3_C7BE_41E7_1F7B9E310867); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.42,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.42,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.43,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 175.28
  }
 ],
 "id": "overlay_F9F98788_F4CF_55F4_41E2_4A911A5E9FF7",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE, this.camera_F31CCE29_E0A3_C78A_41D7_DC71CB0A9340); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.42,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0_HS_3_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.33,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -111.9
  }
 ],
 "id": "overlay_F06D3FF9_E062_C48A_41CB_210372186562",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574, this.camera_F3F9BE19_E0A3_C78A_41D0_82B72ADD21A7); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F9F94787_F4CF_55FB_41ED_D689512520E2_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.49,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 175.08
  }
 ],
 "id": "overlay_FB0E6254_F4F3_2F1C_41C0_0AB91B3366D0",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A, this.camera_F4DD7E83_E0A3_C77E_41E9_67BAB651510F); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0_HS_2_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.66,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 12.43
  }
 ],
 "id": "overlay_FB0F9254_F4F3_2F1C_41D1_0847A0EF0B34",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F9F94787_F4CF_55FB_41ED_D689512520E2, this.camera_F4A93E73_E0A3_C79E_41D3_45F16B6A25AC); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_1_HS_3_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.78,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 50.5
  }
 ],
 "id": "overlay_FB0FB254_F4F3_2F1C_41E2_4FC0EA0DAAA7",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E52832D6_F570_EF1C_41C4_DD4C5628BC58, this.camera_F4BBEE78_E0A3_C78A_41E9_9D62599356B4); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 50.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.29,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_1_HS_4_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.74,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 81.91
  }
 ],
 "id": "overlay_FB0FD254_F4F3_2F1C_41D3_6FAF22634F92",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4, this.camera_F4CCBE7E_E0A3_C786_41E3_81C924D86685); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0_HS_5_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.96,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -32.06
  }
 ],
 "id": "overlay_EFD1B175_E06D_BD9A_41E6_B42095408F28",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA3438E_E06E_5C87_41D6_9347C7940574, this.camera_F4983E6D_E0A3_C78A_41E4_E57178951EC6); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -32.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_FB0E3254_F4F3_2F1C_41DB_DABFFDD4DBBE_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.56,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 28.96
  }
 ],
 "id": "overlay_EAA90BE0_E4EF_9D97_41D4_7F747DE82C27",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF, this.camera_F236FDAB_E0A3_C48E_41D3_EDF9A0B3215A); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.56,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 25.05
  }
 ],
 "id": "overlay_F5DB745C_E52C_EAA8_41D6_B5F4FF5996C8",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465, this.camera_F3C43DF9_E0A3_C48A_41C5_BFFB223CEF01); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 25.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.47,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -21.71
  }
 ],
 "id": "overlay_F78986B3_E52F_B7F9_41DE_9A5A13027ACB",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EFDA984F_E4EC_9AA8_41E9_1717E6CE3906, this.camera_F3B34DF3_E0A3_C49E_41E2_781B73BBA899); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.49,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 136.53
  }
 ],
 "id": "overlay_2D001649_3F86_BC7C_41CD_CF6FC2596233",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4, this.camera_F3E8FE13_E0A3_C79E_41EA_1EF720D329BE); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.89,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 158.26
  }
 ],
 "id": "overlay_F4FC1DF9_E4EB_9569_41B2_D6DCD1BFB099",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F4634421_E52B_AA99_41E3_7AB9311FF4CF, this.camera_F3E78E09_E0A3_C78A_41E4_A5EDCC3B0A32); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D8B1457_3F82_BC14_41C4_96EAAE0FE465_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.11,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -58.33
  }
 ],
 "id": "overlay_ECA7111B_E06E_FD8D_41EB_7F923A2E999C",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F4B2E162_E53C_AA9B_41EB_53C27DE64FA4, this.camera_F39F6DE2_E0A3_C4BE_41CF_8161D6CFB9A7); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ECA7311B_E06E_FD8D_41D4_ED6E4A1A12A7_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 0.34
  }
 ],
 "id": "overlay_EC6F24B7_E062_4486_41CB_08B4E99572CC",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FB0BD302_F571_EEF7_41C5_3444250D104A, this.camera_F2471DB0_E0A3_C49A_41DC_A8634EE2BDF5); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EC6094B7_E062_4486_41EB_CD5A851B1E4A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.43
  }
 ]
},
{
 "shadow": false,
 "children": [
  "this.IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37",
  "this.IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA",
  "this.IconButton_8105A313_8E22_BF0B_41E1_331C6035A930"
 ],
 "id": "Container_80D3CF90_8E26_E705_41E0_E47025A2C106",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "width": "75.269%",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "propagateClick": false,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "layout": "horizontal",
 "horizontalAlign": "right",
 "paddingBottom": 0,
 "data": {
  "name": "-Hide buttons"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "shadow": false,
 "id": "Container_8BEA9761_974D_B047_41DA_8D05A7FEFD9B",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "propagateClick": false,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "height": "55.435%",
 "gap": 10,
 "paddingTop": 0,
 "layout": "horizontal",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "Container Content"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
}],
 "height": "100%",
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
