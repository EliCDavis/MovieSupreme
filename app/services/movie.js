/* 
 * The MIT License
 *
 * Copyright 2016 Eli Davis.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var Rx = require('rx');

module.exports = Movie;

function Movie() {

    var self = this;

    self.lastRequest$ = new Rx.ReplaySubject(1);

    self.movie$ = new Rx.ReplaySubject(1);

    var _onDataReceived = function(data){
        console.log("Data: ",data);
        self.movie$.onNext(data);
    }

    window.movieCallback = _onDataReceived;
    

    self.search = function (query) {

        //xhr.open("GET", "https://api.themoviedb.org/search/movie?query="+query+"&api_key=9d3c8941bb5a7d5abef3326b3cd2cab8");

        var script = document.createElement('script');
        script.src = 'https://api.themoviedb.org/3/movie/now_playing?api_key=9d3c8941bb5a7d5abef3326b3cd2cab8&callback=MovieCallback'
        document.getElementsByTagName('head')[0].appendChild(script);

    }


    self.nowPlaying = function(){
        var script = document.createElement('script');
        script.src = 'https://api.themoviedb.org/3/movie/now_playing?api_key=9d3c8941bb5a7d5abef3326b3cd2cab8&callback=MovieCallback'
        document.getElementsByTagName('head')[0].appendChild(script);
        self.lastRequest$.onNext(" - Now Playing");
    }

    self.upcoming = function(){
        var script = document.createElement('script');
        script.src = 'https://api.themoviedb.org/3/movie/upcoming?api_key=9d3c8941bb5a7d5abef3326b3cd2cab8&callback=MovieCallback'
        document.getElementsByTagName('head')[0].appendChild(script);
        self.lastRequest$.onNext(" - Upcoming");
    }

    self.topRated = function(){
        var script = document.createElement('script');
        script.src = 'https://api.themoviedb.org/3/movie/top_rated?api_key=9d3c8941bb5a7d5abef3326b3cd2cab8&callback=MovieCallback'
        document.getElementsByTagName('head')[0].appendChild(script);
        self.lastRequest$.onNext(" - Top Rated");
    }

}
