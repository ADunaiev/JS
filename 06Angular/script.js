// ініціалізація модуля, масив [] залежностей передається параметром
// ! метод module без другого параметра - пошук модуля, а з параметром - ініціалізація.
// Тому навіть без залежностей масив слід зазанчати.
const mainApp = angular.module("mainApp", []);
// створюємо контролер
mainApp.controller(
    "mainController",     // назва контролера (див. тег з ng-controller)
    function($scope) {    // ф. ініціалізація - наповнення scope 
        $scope.data1 = "Hello";
        $scope.btnClick = function() {
            $scope.data1 += "!";
        };
        $scope.data2 = 10;
        $scope.incClick = function() {
            $scope.data2++;
        }
        $scope.decClick = () => $scope.data2--;
    }
) // більшість методів модуля повертають this
.controller ( // що дозволяє робити каскад операцій
    "secondController",
    function($scope) {
        $scope.data1 = "World";
        $scope.btnClick = function() {
            $scope.data1 += "!";
        };
    }
)
.directive(
    "directive1",
    function() {
        return {
            template: "<b>I am directive One</b>",
            restrict: "A"
        }
    }
)
.directive(
    "directive2",
    function() {
        return {
            template: "<b>I am directive Two</b><p> {{data1}}</p>",
            restrict: "C",
            scope: {}, // ізольований (свій) окіл (scope)
            controller: function($scope) {
                $scope.data1 = "Дані директиви 2";
            }
        }
    }
)
.directive(
    "directive3",
    function() {
        return {
            template: "<b>I am directive Three</b>",
            restrict: "M",
            replace: true // заміняти контейнер собою
        }
    }
)
.directive(
    "directive4",
    function() {
        return {
            template: "<br><b>I am directive Four</b>",
            restrict: "E"
        }
    }
)
;
// як приклад - розірвана інструкція
mainApp.component(
    "component1",
    {
        template: `
            <b ng-click="bClick()">I am component {{x}}</b>
        `,
        controller: function($scope) {
            $scope.x = 1;
            $scope.bClick = () => {
                $scope.x++;
            }
        }
    }
)
.component(
    "component2",
    {
        template: `<div>
            <b ng-click="updateClick()">Last updated at {{data.moment}}</b>
            <p ng-repeat="rate in data.rates" >
                <span ng-if="rate.cc == 'EUR'">
                    <b>1 {{rate.txt}} коштує {{rate.rate}} гривень</b>
                </span>
                <span ng-if="rate.cc != 'EUR'">
                    1 {{rate.txt}} коштує {{rate.rate}} гривень
                </span>
            </p>
            </div>
        `,
        controller: component2Controller
    }
);

/*Принцип інжекціі - передача до функціі необхідних ресурсів
  - параметри $scope, $http це не є вхідні параметри, це "запит" на інжекцію
*/
function component2Controller ($scope, $http) {
    $scope.data = {
        moment: new Date().toLocaleTimeString(),
        rates: []
    };
    $scope.updateClick = () => {
        $scope.data.moment = new Date().toLocaleTimeString();
    };
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    $http.get(url).then( r  =>  {
        $scope.data.rates = r.data; // у сервісі $http r відразу містить JSON у полі "data"
    });

}