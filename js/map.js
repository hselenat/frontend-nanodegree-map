var filterText = ko.observable("");
var map;
var infoWindow;

var placesData = [
    {
        title: 'Empire State Building', 
        position: { lat: 40.7390637, lng: -73.994297 }
    },
    {
        title: 'Washington Square Park', 
        position: {lat: 40.7390637, lng: -73.994297}
    },
    {
        title: 'Lincoln Center for the Performing Arts', 
        position: {lat: 40.7385434, lng: -74.0049401}
    },
    {
        title: 'Museum of the Moving Image', 
        position: {lat: 40.7390637, lng: -73.9858856}
    },
    {
        title: 'Manhattan Bridge', 
        position: {lat: 40.7386735, lng: -74.0131798}
    },
    {
        title: 'East River State Park', 
        position: {lat: 40.7360721, lng: -74.0032234}
    }
];


var Place = function(data) {
    var self = this;
    this.title = data.title;//定义地名
    this.position = data.position;//定义位置
    this.visiable = ko.computed(function(){
        var filter = filterText().toLowerCase();
        var placeName = self.title;
        if(placeName.indexOf(filter) == -1){
            return false;
        } else {
            return true;
        }
    });
    //红色标记
    this.marker = new google.maps.marker({
        position: self.position,
        title: self.title,
        animation: google.maps.Animation.DROP
    });
}

var ViewModel = function() {
    var self = this;
    this.placeList = [];//定义一个空数组的地址列表
    placesData.forEach(function(data){
        self.placeList.push(new Place(data));
    });
    //过滤地址列表
    this.filteredList = ko.computed(function(){
        var resultArray = [];
        self.placeList.forEach(function(place){
            if (place.visiable()) {
                resultArray.push(place);
                place.marker.setMap(map, place.position);
            } else {
                place.marker.setMap(null);
            }
        });

        return resultArray;
    });
}

//初始化地图
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7390637, lng: -73.994297},
        zoom: 13
    });
    infoWindow = new google.maps.infoWindow();
    //将数据绑定到页面中
    ko.applyBindings(new ViewModel());
}