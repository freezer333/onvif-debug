var
  http = require('http'),
  Cam = require('onvif').Cam;

var prompt = require('prompt');
prompt.start();


prompt.get(['hostname', 'port', 'username', 'password'], function (err, input) {
  new Cam(input, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected, now getting ONVIF data");
    }
    this.getStreamUri({
      protocol: 'RTSP'
    }, function (err, stream) {
      console.log("Streaming URI")
      console.log(stream);
    });
    this.getSnapshotUri({}, function (err, uri) {
      console.log("Snapshot URI");
      console.log(uri);
    });
    this.getDeviceInformation(function (err, info) {
      console.log("Device Info");
      console.log(info);
    });
    this.getStatus({}, function (err, info) {
      console.log("Status");
      console.log(info);
    });
    this.getVideoSources(function (err, info) {
      console.log("Video Sources");
      console.log(info);
    });
    this.getCapabilities(function (err, info) {
      console.log("Capabilities");
      console.log(info);
    });
    this.getProfiles(function (err, info) {
      console.log("Profiles");
      console.log(info);
    });
    this.getSystemDateAndTime(function (err, result, xml) {
      console.log("System date + time");
      console.log(err);
      console.log(result);
      console.log(xml);

    });
    this.getVideoSources(function (err, info) {
      console.log("Video Sources");
      console.log(info);
    });
    this.getVideoEncoderConfigurations(function (err, result) {
      var temp = result[0];
      this.getVideoEncoderConfigurationOptions(temp.$.token, function (err, info, xml) {
        if (err) console.log(err)
        else {
          var range = info.extension.H264.frameRateRange;
          console.log(`Framerate range: ${range.min} - ${range.max}`)
          if (Array.isArray(info.H264.resolutionsAvailable)) {
            var resolutions = info.H264.resolutionsAvailable.map(r => `${r.width}x${r.height}`);
            console.log("Available Resolutions")
            console.log(resolutions.join('\n'));
          } else if (info.H264.resolutionsAvailable) {
            console.log("Single resolutions available");
            console.log(info.H264.resolutionsAvailable);
          } else {
            console.log("Resolutions not available")
          }
        }
      });
    })
  });
});