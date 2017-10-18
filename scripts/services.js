'use strict';

angular.module('confusionApp')
        .constant("baseURL", "http://localhost:3000/")
        .factory('menuFactory', ['$resource','baseURL', function($resource,baseURL) {
        	 var menufac = {};


   menufac.getDishes = function(){
        return $resource(baseURL+"dishes/:id",null,{'update':{method:'PUT'}});
        };

    menufac.getPromotion = function(){
        return $resource(baseURL+"promotions/:id",null,{'update':{method:'PUT'}});
    }; 
                  
                return menufac;
                
        }])
       
        .factory('corporateFactory', ['$resource','baseURL', function($resource,baseURL) {
    
            var corpfac = {};
    
            // Implement two functions, one named getLeaders,
            corpfac.getLeaders = function(){
                return $resource(baseURL+"leadership/:id",null,{'update':{method:'PUT'}});
            }
            // the other named getLeader(index)
         /*   corpfac.getLeader = function(index){
                return leadership[index];
            }*/
            return corpfac;
            // Remember this is a factory not a service
    
    
        }])

        .factory('feedbackFactory',['$resource','baseURL',function($resource,baseURL){
            var feedfac = {};
            feedfac.getfeed = function(){
                return $resource(baseURL+"feedback",null,{'save':{method:'POST'}});
            }
            return feedfac;
        }])

;