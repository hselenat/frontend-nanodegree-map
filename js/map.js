// var map;
// function initMap() {
//     // Constructor creates a new map - only center and zoom are required.
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 40.7413549, lng: -73.9980244 },
//         zoom: 13
//     });
// }
//高德地图
// var map = new AMap.Map('map', {
//     resizeEnable: true,
//     zoom:11,
//     center: [116.397428, 39.90923]
// });
//输入框测试
// var filterText = ko.observable("");

// var test = ko.computed(function(){
//     console.log("输入框发生变化，当前输入为："+ filterText());
// });

// ko.applyBindings ();
var filterText = ko.observable("");

var placesDate = [{
        position:{ lat: 21.023418, lng: 105.8516438 },
        title: "vietnames"
    },
    {
        position:{ lat: 21.030708, lng: 105.852405 },
        title: "hoan"
    },
    {
        position:{ lat: 21.035302, lng: 105.849257 },
        title: "old"
    },
    {
        position:{ lat: 21.036713, lng: 105.834731 },
        title: "mausoleum"
    },
    {
        position:{ lat: 21.047953, lng: 105.836979 },
        title: "pagoda"
    }
];

var Place = function(data) {
    this.title = data.title;
    this.position = data.position;
}

var ViewModel = function() {
    var self = this;
    this.Places = [];
    placesDate.forEach(function(data){
        self.Places.push(new Place(data));
    })
}

ko.applyBindings (ViewModel);