var apiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key=84b87941369041138395b305eeac87ad&q="

var map,infoWindow;

var placesData = [
    {
        title: '帝国大厦 Empire State Building', 
        position: { lat: 40.7484934, lng: -73.9857053}
    },
    {
        title: '华盛顿广场公园 Washington Square Park', 
        position: {lat: 40.73078, lng: -73.9974203}
    },
    {
        title: '林肯中心 Lincoln Center for the Performing Arts', 
        position: {lat: 40.7723273, lng: -73.983445}
    },
    {
        title: '纽约市立动熊固像博物馆 Museum of the Moving Image', 
        position: {lat: 40.7563864, lng: -73.9239153}
    },
    {
        title: '曼哈顿大桥 Manhattan Bridge', 
        position: {lat: 40.7074968, lng: -73.9906896}
    },
    {
        title: '东河州立公园 East River State Park', 
        position: {lat: 40.7214233, lng: -73.9619996}
    }
];

var filterText = ko.observable("");//过滤搜索地址信息
var Place = function(data) {
    var self = this;
    this.title = data.title;//定义地名
    this.position = data.position;//定义位置
    this.visiable = ko.computed(function(){
        var filter = filterText().toLowerCase();
        var placeName = self.title.toLowerCase();
        if(placeName.indexOf(filter) == -1) {
            return false;
        } else {
            return true;
        }
    });
    //红色标记
    this.marker = new google.maps.Marker({
        position: self.position,
        title: self.title,
        animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(this.marker, "click", function(){
        // 生成标记信息窗口
        infoWindow.setContent(self.title);
        infoWindow.open(map, self.marker);

        // 动画
        if (self.marker.getAnimation() !== null){
            self.marker.setAnimation(null);
        } else {
            self.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
                self.marker.setAnimation(null);
            },2000);
        }

        //jQuery异步加载API
        $.ajax({
            url: apiUrl + self.title,
            dataType: "json",
            timeout: 5000
        }).done(function(data){
            // 设置infowindow 内容
            infoWindow.setContent(data.response.docs[0].snippet);
            infoWindow.open(map, self.marker)
        }).fail(function(){
            alert("API loading error!!!")
        });
    });
    //点击地址列表的地址出现动画和数据
    this.mapClick = function(){
        google.maps.event.trigger(self.marker, "click");//模拟点击当前位置
    }
};

var ViewModel = function() {
    var self = this;
    this.placeList = [];//定义一个空数组的地址列表
    placesData.forEach(function(data){
        self.placeList.push(new Place(data));
    });
    //过滤地址列表
    this.filteredList = ko.computed(function() {
        var resultArray = [];
        self.placeList.forEach(function(place){
            if (place.visiable()) {
                resultArray.push(place);
                place.marker.setMap(map, place.position);
            } else {
                place.marker.setMap(null);
            };
        });
        return resultArray;
    });
    this.click = function(place){
        google.maps.event.trigger(place.marker, "click");
    }
}

function googleError(){
    alert("地图加载错误！");
}

//初始化地图
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7390637, lng: -73.994297},
        zoom: 13,
        gestureHandling: 'greedy'//设置滚轮缩放
    });
    infoWindow = new google.maps.InfoWindow();
    //将数据绑定到页面中
    ko.applyBindings(new ViewModel());
}