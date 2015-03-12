angular.module('starter.controllers', ['ngCordova','ngCordova.plugins.fileTransfer','ngCordova.plugins.imagePicker'])

.controller('DashCtrl', function($scope, $cordovaFileTransfer, $cordovaImagePicker) {

    $scope.pickimage = function() {
		console.log("incontroller");
        var options = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 80
        };

        $cordovaImagePicker.getPictures(options)
            .then(function(results) {
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                    $scope.file += results[i];
                    $scope.$apply();
                }
            }, function(error) {
				console.log("error in getting photos");
                // error getting photos
            });
    };
//	var filePath = cordova.file.documentsDirectory 
    $scope.submitfile = function() {
        //        $scope.file=$('input[type=file]').files[0].webkitRelativePath;
        //        console.log($scope.file);
        $cordovaFileTransfer.upload("http://mafiawarloots.com/sergybackend/uploads/", filePath, options)
            .then(function(result) {
                // Success!
            }, function(err) {
                // Error
            }, function(progress) {
                // constant progress updates
            });


    };

})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});