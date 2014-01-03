!function(a,b){"use strict";!function c(a,b,d){function e(g,h){if(!b[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=b[g]={exports:{}};a[g][0].call(j.exports,function(b){var c=a[g][1][b];return e(c?c:b)},j,j.exports,c,a,b,d)}return b[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=a("../util/mathExtensions");b.exports={LEFT:37,UP:38,RIGHT:39,DOWN:40,MIN:37,toString:function(a){return["left","up","right","down"][a-b.exports.MIN]},opposite:function(a){return[b.exports.RIGHT,b.exports.DOWN,b.exports.LEFT,b.exports.UP][a-b.exports.MIN]},random:function(){return b.exports.MIN+c.randomInt(4)}}},{"../util/mathExtensions":6}],2:[function(c){function d(a){var c,d=new f.Graph;for(c in a)a.hasOwnProperty(c)&&(c=parseInt(c),d.addNode(c));for(c in a)if(a.hasOwnProperty(c)){c=parseInt(c);for(var e,h,i,j,k=d.getNode(c),l=a[c],m=l.length,n=0;m>n;n++)h=l[n],h!==b&&(i=d.getNode(h),j=n+g.MIN,e=d.addEdge(k,i),e.data=j)}return d}function e(a,c,d){var e,f=[];for(a.dijkstra(c,d),e=d;e.previous!==b;){var g=a.getEdge(e.previous,e).data;f.push(g),e=e.previous}return f.reverse()}var f=c("./util/graph"),g=c("./enum/direction");addEventListener("message",function(c){var f=c.data;if(f.graph!==b&&f.source!==b&&f.destination!==b){var g=d(f.graph),h=g.getNode(f.source),i=g.getNode(f.destination),j=e(g,h,i);a.postMessage(j)}})},{"./enum/direction":1,"./util/graph":4}],3:[function(a,b){b.exports={BoundingBox:function(a,c,d,e){var f,g,h,i;switch(arguments.length){case 2:var j=a,k=c;f=j.x,g=j.y,h=k.x-j.x,i=k.y-j.y;break;case 4:f=a,g=c,h=d,i=e}if(0>h||0>i)throw new Error("Invalid dimensions for BoundingBox.");Object.defineProperties(this,{x:{get:function(){return f},set:function(a){f=a}},y:{get:function(){return g},set:function(a){g=a}},width:{get:function(){return h}},height:{get:function(){return i}},center:{get:function(){return{x:this.x+this.width/2,y:this.y+this.height/2}}}}),this.containsBoundingBox=function(a){return a.x>=f&&a.x+a.width<=f+h&&a.y>=g&&a.y+a.height<=g+i},this.containsPoint=function(a){return a.x>=f&&a.x<=f+h&&a.y>=g&&a.y<=g+i},this.intersects=function(a){return!(this.x+this.width<a.x||a.x+a.width<this.x||this.y+this.height<a.y||a.y+a.height<this.y)},this.intersection=function(a){var c=Math.max(this.x,a.x),d=Math.max(this.y,a.y),e=Math.min(this.x+this.width,a.x+a.width),f=Math.min(this.y+this.height,a.y+a.height),g=e-c,h=f-d;return 0>g||0>h?null:new b.exports.BoundingBox(c,d,g,g)}}}},{}],4:[function(a,b){var c=(a("underscore"),a("./hash")),d=a("./minHeap");b.exports={Graph:function(){function a(a){var b=this;this.data=a;var d=new c.Hashset;h.put(this,d),Object.defineProperties(this,{edges:{get:function(){return h.get(b)}},neighbors:{get:function(){var a=new c.Hashset;return b.edges.forEach(function(b){a.add(b.head)}),a}}}),this.reachableNodes=function(){function a(b,c,d){d.contains(b)||(c.add(b),b.neighbors.forEach(function(b){a(b,c,d)}))}var d=new c.Hashset;return a(b,d,new c.Hashset),d}}function e(a,b,c,d){this.tail=a,this.head=b,this.weight=c||0,this.data=d}var f=new c.Hashset,g=new c.Hashset,h=new c.Hashtable;Object.defineProperties(this,{nodes:{get:function(){return f}},edges:{get:function(){return g}},adjacencyList:{get:function(){return h}}}),this.addNode=function(b){var c=new a(b);return this.nodes.add(c),c},this.getNode=function(a){var b;return this.nodes.forEach(function(c){return c.data===a?(b=c,!0):void 0}),b},this.addEdge=function(a,b){var c=new e(a,b);return g.add(c),h.get(a).add(c),c},this.getEdge=function(a,b){return this.adjacencyList.get(a).toArray().filter(function(a){return a.head===b})[0]},this.removeEdge=function(a,b){var c;a.edges.forEach(function(d){return d.tail===a&&d.head===b?(c=d,!0):void 0}),g.remove(c),a.edges.remove(c)},this.depthFirstSearch=function(a){function b(c){if(d.contains(c))return!0;d.add(c);var e=a(c);if(e!==!0){var f;return c.neighbors.forEach(function(a){f=b(a)||f}),f}return e}var d=new c.Hashset,e=!1;f.forEach(function(a){e!==!0&&(e=b(a))})},this.breadthFirstSearch=function(a){function b(b){if(!d.contains(b)){d.add(b);var c=a(b)||!1;return c!==!0&&b.neighbors.forEach(function(a){e.push(a)}),c}}var d=new c.Hashset,e=[],g=0;for(f.forEach(function(a){e.push(a)});g<e.length;){var h=e[g++],i=b(h);if(i)return}},this.dijkstra=function(a){f.forEach(function(a){a.weight=1/0,a.visited=!1,delete a.previous}),a.weight=0;var b=new d.MinHeap(function(a,b){return isFinite(a.weight)&&isFinite(b)?a.weight-b.weight:isFinite(a)?-1:isFinite(b)?1:0});b.add(a);for(var c=function(a){var c=e.weight+1;c<a.weight&&(a.weight=c,a.previous=e,a.visited||b.add(a))};0!==b.length;){var e=b.poll();e.visited=!0,e.neighbors.forEach(c)}},this.kruskal=function(){var a=new b.exports.Graph,d=new c.Hashtable;f.forEach(function(b){var c=a.addNode(b.data);d.put(b,c)});var e=g.toArray();return e.sort(function(a,b){return a.weight-b.weight}),e.forEach(function(b){var c=d.get(b.tail),e=c.reachableNodes(),f=d.get(b.head),g=f.reachableNodes();e.equals(g)||a.addEdge(c,f)}),a}}}},{"./hash":5,"./minHeap":7,underscore:8}],5:[function(a,c){var d=a("underscore"),e=0,f=16,g=.5;c.exports={hashcode:function(a){return a._hashId===b&&(Object.defineProperty(a,"_hashId",{value:e,enumerable:!1}),e++),a._hashId},Hashset:function(){function a(a,b){var c=k[b];return d.isArray(c)?d.contains(c,a)?!1:(c.push(a),!0):(k[b]=[c,a],!0)}function e(a){var b=d.sortedIndex(n,a);n[b]!==a&&n.splice(b,0,a)}function h(){var a,b=k,c=n;m*=2,k=new Array(m),n=[];for(var e=c.length,f=0;e>f;f++){var g=b[c[f]];if(d.isArray(g))for(var h=g,j=h.length,l=0;j>l;l++){var o=h[l];a=o.key||o,i(o,a)}else a=g.key||g,i(g,a)}}function i(d,f){var g=f||null;f=f||d;var h,i=c.exports.hashcode(f)%m,j=k[i];return j&&(h=j.key),j===b?(k[i]=d,e(i),!0):j===d||g===h?!1:a(d,i)}var j=this,k=new Array(f),l=0,m=f,n=[];Object.defineProperties(this,{length:{get:function(){return l}}}),this.add=function(a,b){if(b=b||a,!d.isObject(a)||d.isArray(a)||d.isFunction(a))return!1;var c=i(a,b);return c?(l++,l/m>g&&h(),!0):!1},this.union=function(a){var b=new Hash.Hashset;return j.forEach(function(a){b.add(a)}),a.forEach(function(a){b.add(a)}),b},this.clear=function(){k=new Array(f),l=0,m=f,n=[]},this.contains=function(a,b){var e=b||null;if(b=b||a,!d.isObject(a)||d.isArray(a)||d.isFunction(a))return!1;var f,g=c.exports.hashcode(b)%m,h=k[g];if(h&&(f=h.key),h===a||e===f)return!0;if(d.isArray(h))for(var i=0;i<h.length;i++){var j,l=h[i];if(l&&(j=l.key),l===a||e===j)return!0}return!1},this.equals=function(a){if(this.length!==a.length)return!1;var b=!0;return this.forEach(function(c){return a.contains(c)?void 0:(b=!1,!0)}),b},this.remove=function(a,b){var e=b||null;if(b=b||a,!d.isObject(a)||d.isArray(a)||d.isFunction(a))return!1;var f=j.contains(a,e);if(f){var g,h=c.exports.hashcode(b)%m,i=k[h];if(i&&(g=i.key),i===a||g===e)return delete k[h],n=d.without(n,h),l--,!0;for(var o=0;o<i.length;o++)if(i[o]===a)return delete i[o],l--,!0}return!1},this.get=function(a,d){var e=d||null;d=d||a;var f,g=c.exports.hashcode(d)%m,h=k[g];if(h&&(f=h.key),h===b)return null;if(h===a||f===e)return h;for(var i=h.length,j=0;i>j;j++){var l=h[j],n=l.key;if(l===a||n===e)return l}return null},this.forEach=function(a){for(var b,c=n.length,e=0;c>e;e++){var f=n[e],g=k[f];if(d.isArray(g))for(var h=g.length,i=0;h>i;i++){var j=g[i];if(b=a(j),b===!0)return}else if(b=a(g),b===!0)return}},this.toArray=function(){var a=[];return this.forEach(function(b){a.push(b)}),a}},Hashtable:function(){var a=new c.exports.Hashset;this.put=function(b,c){var d={key:b,value:c};return a.add(d,b)},this.get=function(b){return a.get(b,b).value},this.containsKey=function(b){return a.contains(b,b)},this.remove=function(b){return a.remove(b,b)},this.clear=function(){a.clear()},this.forEach=function(b){a.forEach(function(a){b(a.key,a.value)})},Object.defineProperties(this,{length:{get:function(){return a.length}}})}}},{underscore:8}],6:[function(a,b){{var c=a("underscore");a("./boundingBox")}b.exports={randomInt:function(){return Math.floor(b.exports.randomFloat.apply(this,arguments))},randomFloat:function(a,b){var c,d,e;switch(arguments.length){case 1:c=0,d=a;break;case 2:c=a,d=b}return e=d-c,Math.random()*e+c},randomIterator:function(a,c){for(var d=[],e=0;a>e;e++)d.push(e);for(;d.length>0;){var f=b.exports.randomInt(d.length),g=c(d[f]);if(g===!0)return;d.splice(f,1)}},dotProduct:function(a,b){var c=0;if(a.length!==b.length)return null;for(var d=0;d<a.length;d+=1)c+=a[d]*b[d];return c},rotationMatrix:function(a){return new b.exports.Matrix([Math.cos(a),-Math.sin(a),0,Math.sin(a),Math.cos(a),0,0,0,1],3,3)},buildMatrix:function(a){var d=a.length,e=a[0].length;return new b.exports.Matrix(c.flatten(a),d,e)},Matrix:function(a,d,e){function f(a,c){var d=[];return i.numRows!==a.numRows||i.numColumns!==a.numColumns?null:(i.forEachEntry(function(b,e,f){var g=b+c*a.get(e,f);d.push(g)}),new b.exports.Matrix(d,i.numRows,i.numColumns))}function g(){h=[];for(var b=0;b<i.numRows;b+=1){for(var c=[],d=0;d<i.numColumns;d+=1)c.push(a[b*i.numColumns+d]);h.push(c)}}var h,i=this;this.numRows=d,this.numColumns=e,this.forEachEntry=function(a){for(var b=0;d>b;b+=1)for(var c=0;e>c;c+=1)a(h[b][c],b,c)},this.get=function(a,b){return h[a][b]},this.set=function(a,b,c){h[a][b]=c},this.getRow=function(a){return h[a].slice(0)},this.getColumn=function(a){for(var b=[],c=0;c<i.numRows;c+=1)b.push(h[c][a]);return b},this.toArray2D=function(){var a=[];return this.forEachEntry(function(b,c){for(;c>=a.length;)a.push([]);a[c].push(b)}),a},this.add=function(a){return f(a,1)},this.subtract=function(a){return f(a,-1)},this.multiply=function(a){var c,d,e,f=[];if(i.numColumns!==a.numRows)return null;for(var g=0;g<i.numRows;g+=1){c=i.getRow(g);for(var h=0;h<a.numColumns;h+=1)d=a.getColumn(h),e=b.exports.dotProduct(c,d),f.push(e)}return new b.exports.Matrix(f,this.numRows,a.numColumns)},this.multiplyCoefficient=function(a){var c=[];return this.forEachEntry(function(b){c.push(b*a)}),new b.exports.Matrix(c,this.numRows,this.numRows)},this.luDecomposition=function(){function a(){for(var a=i.numRows,d=[],e=function(a){return i.get(a,f)},f=0;a>f;f++){d.push([]);for(var g=0;a>g;g++)d[f].push(g===f?1:0)}for(f=0;a>f;f++){var h=c.max(c.range(f,a),e);if(f!==h){var j=d[f];d[f]=d[h],d[h]=j}}return b.exports.buildMatrix(d)}var d,e,f,g=i.numRows,h=[],j=[],k=a(),l=k.multiply(i).toArray2D();for(d=0;g>d;d++)for(h.push([]),j.push([]),e=0;g>e;e++)h[d].push(0),j[d].push(0);for(e=0;g>e;e++){for(h[e][e]=1,d=0;e>=d;d++){var m=0;for(f=0;d>f;f++)m+=j[f][e]*h[d][f];j[d][e]=l[d][e]-m}for(d=e;g>d;d++){var n=0;for(f=0;e>f;f++)n+=j[f][e]*h[d][f];h[d][e]=(l[d][e]-n)/j[e][e]}}return{l:b.exports.buildMatrix(h),u:b.exports.buildMatrix(j),p:k}},this.determinant=function(){for(var a=this.luDecomposition(),b=a.l,c=a.u,d=a.p,e=1,f=0;f<this.numRows;f++)e*=b.get(f,f)*c.get(f,f)*d.get(f,f);return e},this.inverse=function(){if(3===this.numRows){var a=this.get(0,0),c=this.get(0,1),d=this.get(0,2),e=this.get(1,0),f=this.get(1,1),g=this.get(1,2),h=this.get(2,0),i=this.get(2,1),j=this.get(2,2),k=a*(f*j-g*i)-c*(j*e-g*h)+d*(e*i-f*h),l=new b.exports.Matrix([f*j-g*i,-(c*j-d*i),c*g-d*f,-(e*j-g*h),a*j-d*h,-(a*g-d*e),e*i-f*h,-(a*i-c*h),a*f-c*e],3,3);return l.multiplyCoefficient(1/k)}},g()},Transformation:function(){var a=new b.exports.Matrix([1,0,0,0,1,0,0,0,1],3,3),c=0;Object.defineProperties(this,{tx:{get:function(){return a.get(0,2)},set:function(b){a.set(0,2,b)}},ty:{get:function(){return a.get(1,2)},set:function(b){a.set(1,2,b)}},sx:{get:function(){return a.get(0,0)},set:function(b){a.set(0,0,b)}},sy:{get:function(){return a.get(1,1)},set:function(b){a.set(1,1,b)}},shx:{get:function(){return a.get(0,1)},set:function(b){a.set(0,1,b)}},shy:{get:function(){return a.get(1,0)},set:function(b){a.set(1,0,b)}},angle:{get:function(){return c},set:function(a){this.rotate(-c+a)}}}),this.translate=function(b,c){a.set(0,2,b),a.set(1,2,c)},this.rotate=function(d){c=(c+d)%(2*Math.PI);var e=b.exports.rotationMatrix(d);a=a.multiply(e)},this.applyToPoint=function(c){var d=new b.exports.Matrix([c.x,c.y,1],3,1),e=a.multiply(d),f=e.get(0,0),g=e.get(1,0);return{x:f,y:g}},this.adjustPoint=function(c){var d=new b.exports.Matrix([c.x,c.y,1],3,1),e=a.inverse().multiply(d),f=e.get(0,0),g=e.get(1,0);return{x:f,y:g}}}}},{"./boundingBox":3,underscore:8}],7:[function(a,b){var c=16;b.exports={MinHeap:function(){function a(a){return 2*a+1}function b(a){return 2*a+2}function d(a){return Math.floor((a+1)/2)-1}function e(a){if(0!==a){var b=d(a);if(i(j[b],j[a])>0&&b>=0){var c=j[b];j[b]=j[a],j[a]=c,a=b,e(a)}}}function f(){0!==k&&(j[0]=j[k-1],k--,k>0&&g(0))}function g(c){var d,e=a(c),f=b(c);if(k>e&&k>f)d=i(j[e],j[f])<0?e:f;else if(k>e)d=e;else{if(!(k>f))return;d=f}if(d>=0&&i(j[d],j[c])<0){var h=j[c];j[c]=j[d],j[d]=h,c=d,g(c)}}var h=c,i=function(a,b){return a-b};if(2===arguments.length)h=arguments[0],i=arguments[1];else if(1===arguments.length)i=arguments[0];else if(arguments.length>2)throw new Error("Invalid parameters for MinHeap constructor");var j=new Array(h),k=0;this.add=function(a){k++;var b=k-1;j[b]=a,e(b)},this.poll=function(){var a=j[0];return f(),a},this.peek=function(){return j[0]},this.clear=function(){k=0,j.forEach(function(a,b){delete j[b]})},Object.defineProperties(this,{length:{get:function(){return k}}})}}},{}],8:[function(a,b,c){(function(){var a=this,d=a._,e={},f=Array.prototype,g=Object.prototype,h=Function.prototype,i=f.push,j=f.slice,k=f.concat,l=g.toString,m=g.hasOwnProperty,n=f.forEach,o=f.map,p=f.reduce,q=f.reduceRight,r=f.filter,s=f.every,t=f.some,u=f.indexOf,v=f.lastIndexOf,w=Array.isArray,x=Object.keys,y=h.bind,z=function(a){return a instanceof z?a:this instanceof z?(this._wrapped=a,void 0):new z(a)};"undefined"!=typeof c?("undefined"!=typeof b&&b.exports&&(c=b.exports=z),c._=z):a._=z,z.VERSION="1.5.2";var A=z.each=z.forEach=function(a,b,c){if(null!=a)if(n&&a.forEach===n)a.forEach(b,c);else if(a.length===+a.length){for(var d=0,f=a.length;f>d;d++)if(b.call(c,a[d],d,a)===e)return}else for(var g=z.keys(a),d=0,f=g.length;f>d;d++)if(b.call(c,a[g[d]],g[d],a)===e)return};z.map=z.collect=function(a,b,c){var d=[];return null==a?d:o&&a.map===o?a.map(b,c):(A(a,function(a,e,f){d.push(b.call(c,a,e,f))}),d)};var B="Reduce of empty array with no initial value";z.reduce=z.foldl=z.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),p&&a.reduce===p)return d&&(b=z.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(A(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(B);return c},z.reduceRight=z.foldr=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),q&&a.reduceRight===q)return d&&(b=z.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=a.length;if(f!==+f){var g=z.keys(a);f=g.length}if(A(a,function(h,i,j){i=g?g[--f]:--f,e?c=b.call(d,c,a[i],i,j):(c=a[i],e=!0)}),!e)throw new TypeError(B);return c},z.find=z.detect=function(a,b,c){var d;return C(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},z.filter=z.select=function(a,b,c){var d=[];return null==a?d:r&&a.filter===r?a.filter(b,c):(A(a,function(a,e,f){b.call(c,a,e,f)&&d.push(a)}),d)},z.reject=function(a,b,c){return z.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},z.every=z.all=function(a,b,c){b||(b=z.identity);var d=!0;return null==a?d:s&&a.every===s?a.every(b,c):(A(a,function(a,f,g){return(d=d&&b.call(c,a,f,g))?void 0:e}),!!d)};var C=z.some=z.any=function(a,b,c){b||(b=z.identity);var d=!1;return null==a?d:t&&a.some===t?a.some(b,c):(A(a,function(a,f,g){return d||(d=b.call(c,a,f,g))?e:void 0}),!!d)};z.contains=z.include=function(a,b){return null==a?!1:u&&a.indexOf===u?-1!=a.indexOf(b):C(a,function(a){return a===b})},z.invoke=function(a,b){var c=j.call(arguments,2),d=z.isFunction(b);return z.map(a,function(a){return(d?b:a[b]).apply(a,c)})},z.pluck=function(a,b){return z.map(a,function(a){return a[b]})},z.where=function(a,b,c){return z.isEmpty(b)?c?void 0:[]:z[c?"find":"filter"](a,function(a){for(var c in b)if(b[c]!==a[c])return!1;return!0})},z.findWhere=function(a,b){return z.where(a,b,!0)},z.max=function(a,b,c){if(!b&&z.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);if(!b&&z.isEmpty(a))return-1/0;var d={computed:-1/0,value:-1/0};return A(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g>d.computed&&(d={value:a,computed:g})}),d.value},z.min=function(a,b,c){if(!b&&z.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.min.apply(Math,a);if(!b&&z.isEmpty(a))return 1/0;var d={computed:1/0,value:1/0};return A(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g<d.computed&&(d={value:a,computed:g})}),d.value},z.shuffle=function(a){var b,c=0,d=[];return A(a,function(a){b=z.random(c++),d[c-1]=d[b],d[b]=a}),d},z.sample=function(a,b,c){return arguments.length<2||c?a[z.random(a.length-1)]:z.shuffle(a).slice(0,Math.max(0,b))};var D=function(a){return z.isFunction(a)?a:function(b){return b[a]}};z.sortBy=function(a,b,c){var d=D(b);return z.pluck(z.map(a,function(a,b,e){return{value:a,index:b,criteria:d.call(c,a,b,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index-b.index}),"value")};var E=function(a){return function(b,c,d){var e={},f=null==c?z.identity:D(c);return A(b,function(c,g){var h=f.call(d,c,g,b);a(e,h,c)}),e}};z.groupBy=E(function(a,b,c){(z.has(a,b)?a[b]:a[b]=[]).push(c)}),z.indexBy=E(function(a,b,c){a[b]=c}),z.countBy=E(function(a,b){z.has(a,b)?a[b]++:a[b]=1}),z.sortedIndex=function(a,b,c,d){c=null==c?z.identity:D(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;c.call(d,a[h])<e?f=h+1:g=h}return f},z.toArray=function(a){return a?z.isArray(a)?j.call(a):a.length===+a.length?z.map(a,z.identity):z.values(a):[]},z.size=function(a){return null==a?0:a.length===+a.length?a.length:z.keys(a).length},z.first=z.head=z.take=function(a,b,c){return null==a?void 0:null==b||c?a[0]:j.call(a,0,b)},z.initial=function(a,b,c){return j.call(a,0,a.length-(null==b||c?1:b))},z.last=function(a,b,c){return null==a?void 0:null==b||c?a[a.length-1]:j.call(a,Math.max(a.length-b,0))},z.rest=z.tail=z.drop=function(a,b,c){return j.call(a,null==b||c?1:b)},z.compact=function(a){return z.filter(a,z.identity)};var F=function(a,b,c){return b&&z.every(a,z.isArray)?k.apply(c,a):(A(a,function(a){z.isArray(a)||z.isArguments(a)?b?i.apply(c,a):F(a,b,c):c.push(a)}),c)};z.flatten=function(a,b){return F(a,b,[])},z.without=function(a){return z.difference(a,j.call(arguments,1))},z.uniq=z.unique=function(a,b,c,d){z.isFunction(b)&&(d=c,c=b,b=!1);var e=c?z.map(a,c,d):a,f=[],g=[];return A(e,function(c,d){(b?d&&g[g.length-1]===c:z.contains(g,c))||(g.push(c),f.push(a[d]))}),f},z.union=function(){return z.uniq(z.flatten(arguments,!0))},z.intersection=function(a){var b=j.call(arguments,1);return z.filter(z.uniq(a),function(a){return z.every(b,function(b){return z.indexOf(b,a)>=0})})},z.difference=function(a){var b=k.apply(f,j.call(arguments,1));return z.filter(a,function(a){return!z.contains(b,a)})},z.zip=function(){for(var a=z.max(z.pluck(arguments,"length").concat(0)),b=new Array(a),c=0;a>c;c++)b[c]=z.pluck(arguments,""+c);return b},z.object=function(a,b){if(null==a)return{};for(var c={},d=0,e=a.length;e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},z.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=z.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(u&&a.indexOf===u)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1},z.lastIndexOf=function(a,b,c){if(null==a)return-1;var d=null!=c;if(v&&a.lastIndexOf===v)return d?a.lastIndexOf(b,c):a.lastIndexOf(b);for(var e=d?c:a.length;e--;)if(a[e]===b)return e;return-1},z.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=new Array(d);d>e;)f[e++]=a,a+=c;return f};var G=function(){};z.bind=function(a,b){var c,d;if(y&&a.bind===y)return y.apply(a,j.call(arguments,1));if(!z.isFunction(a))throw new TypeError;return c=j.call(arguments,2),d=function(){if(!(this instanceof d))return a.apply(b,c.concat(j.call(arguments)));G.prototype=a.prototype;var e=new G;G.prototype=null;var f=a.apply(e,c.concat(j.call(arguments)));return Object(f)===f?f:e}},z.partial=function(a){var b=j.call(arguments,1);return function(){return a.apply(this,b.concat(j.call(arguments)))}},z.bindAll=function(a){var b=j.call(arguments,1);if(0===b.length)throw new Error("bindAll must be passed function names");return A(b,function(b){a[b]=z.bind(a[b],a)}),a},z.memoize=function(a,b){var c={};return b||(b=z.identity),function(){var d=b.apply(this,arguments);return z.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},z.delay=function(a,b){var c=j.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},z.defer=function(a){return z.delay.apply(z,[a,1].concat(j.call(arguments,1)))},z.throttle=function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:new Date,g=null,f=a.apply(d,e)};return function(){var j=new Date;h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e)):g||c.trailing===!1||(g=setTimeout(i,k)),f}},z.debounce=function(a,b,c){var d,e,f,g,h;return function(){f=this,e=arguments,g=new Date;var i=function(){var j=new Date-g;b>j?d=setTimeout(i,b-j):(d=null,c||(h=a.apply(f,e)))},j=c&&!d;return d||(d=setTimeout(i,b)),j&&(h=a.apply(f,e)),h}},z.once=function(a){var b,c=!1;return function(){return c?b:(c=!0,b=a.apply(this,arguments),a=null,b)}},z.wrap=function(a,b){return function(){var c=[a];return i.apply(c,arguments),b.apply(this,c)}},z.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},z.after=function(a,b){return function(){return--a<1?b.apply(this,arguments):void 0}},z.keys=x||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)z.has(a,c)&&b.push(c);return b},z.values=function(a){for(var b=z.keys(a),c=b.length,d=new Array(c),e=0;c>e;e++)d[e]=a[b[e]];return d},z.pairs=function(a){for(var b=z.keys(a),c=b.length,d=new Array(c),e=0;c>e;e++)d[e]=[b[e],a[b[e]]];return d},z.invert=function(a){for(var b={},c=z.keys(a),d=0,e=c.length;e>d;d++)b[a[c[d]]]=c[d];return b},z.functions=z.methods=function(a){var b=[];for(var c in a)z.isFunction(a[c])&&b.push(c);return b.sort()},z.extend=function(a){return A(j.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},z.pick=function(a){var b={},c=k.apply(f,j.call(arguments,1));return A(c,function(c){c in a&&(b[c]=a[c])}),b},z.omit=function(a){var b={},c=k.apply(f,j.call(arguments,1));for(var d in a)z.contains(c,d)||(b[d]=a[d]);return b},z.defaults=function(a){return A(j.call(arguments,1),function(b){if(b)for(var c in b)void 0===a[c]&&(a[c]=b[c])}),a},z.clone=function(a){return z.isObject(a)?z.isArray(a)?a.slice():z.extend({},a):a},z.tap=function(a,b){return b(a),a};var H=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof z&&(a=a._wrapped),b instanceof z&&(b=b._wrapped);var e=l.call(a);if(e!=l.call(b))return!1;switch(e){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return d[f]==b;var g=a.constructor,h=b.constructor;if(g!==h&&!(z.isFunction(g)&&g instanceof g&&z.isFunction(h)&&h instanceof h))return!1;c.push(a),d.push(b);var i=0,j=!0;if("[object Array]"==e){if(i=a.length,j=i==b.length)for(;i--&&(j=H(a[i],b[i],c,d)););}else{for(var k in a)if(z.has(a,k)&&(i++,!(j=z.has(b,k)&&H(a[k],b[k],c,d))))break;if(j){for(k in b)if(z.has(b,k)&&!i--)break;j=!i}}return c.pop(),d.pop(),j};z.isEqual=function(a,b){return H(a,b,[],[])},z.isEmpty=function(a){if(null==a)return!0;if(z.isArray(a)||z.isString(a))return 0===a.length;for(var b in a)if(z.has(a,b))return!1;return!0},z.isElement=function(a){return!(!a||1!==a.nodeType)},z.isArray=w||function(a){return"[object Array]"==l.call(a)},z.isObject=function(a){return a===Object(a)},A(["Arguments","Function","String","Number","Date","RegExp"],function(a){z["is"+a]=function(b){return l.call(b)=="[object "+a+"]"}}),z.isArguments(arguments)||(z.isArguments=function(a){return!(!a||!z.has(a,"callee"))}),"function"!=typeof/./&&(z.isFunction=function(a){return"function"==typeof a}),z.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},z.isNaN=function(a){return z.isNumber(a)&&a!=+a},z.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==l.call(a)},z.isNull=function(a){return null===a},z.isUndefined=function(a){return void 0===a},z.has=function(a,b){return m.call(a,b)},z.noConflict=function(){return a._=d,this},z.identity=function(a){return a},z.times=function(a,b,c){for(var d=Array(Math.max(0,a)),e=0;a>e;e++)d[e]=b.call(c,e);return d},z.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=z.invert(I.escape);var J={escape:new RegExp("["+z.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+z.keys(I.unescape).join("|")+")","g")};z.each(["escape","unescape"],function(a){z[a]=function(b){return null==b?"":(""+b).replace(J[a],function(b){return I[a][b]})}}),z.result=function(a,b){if(null==a)return void 0;var c=a[b];return z.isFunction(c)?c.call(a):c},z.mixin=function(a){A(z.functions(a),function(b){var c=z[b]=a[b];z.prototype[b]=function(){var a=[this._wrapped];return i.apply(a,arguments),O.call(this,c.apply(z,a))}})};var K=0;z.uniqueId=function(a){var b=++K+"";return a?a+b:b},z.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var L=/(.)^/,M={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},N=/\\|'|\r|\n|\t|\u2028|\u2029/g;z.template=function(a,b,c){var d;c=z.defaults({},c,z.templateSettings);var e=new RegExp([(c.escape||L).source,(c.interpolate||L).source,(c.evaluate||L).source].join("|")+"|$","g"),f=0,g="__p+='";a.replace(e,function(b,c,d,e,h){return g+=a.slice(f,h).replace(N,function(a){return"\\"+M[a]}),c&&(g+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"),d&&(g+="'+\n((__t=("+d+"))==null?'':__t)+\n'"),e&&(g+="';\n"+e+"\n__p+='"),f=h+b.length,b}),g+="';\n",c.variable||(g="with(obj||{}){\n"+g+"}\n"),g="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+g+"return __p;\n";try{d=new Function(c.variable||"obj","_",g)}catch(h){throw h.source=g,h}if(b)return d(b,z);var i=function(a){return d.call(this,a,z)};return i.source="function("+(c.variable||"obj")+"){\n"+g+"}",i},z.chain=function(a){return z(a).chain()};var O=function(a){return this._chain?z(a).chain():a};z.mixin(z),A(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=f[a];z.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!=a&&"splice"!=a||0!==c.length||delete c[0],O.call(this,c)}}),A(["concat","join","slice"],function(a){var b=f[a];z.prototype[a]=function(){return O.call(this,b.apply(this._wrapped,arguments))}}),z.extend(z.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this)},{}]},{},[2])}(self);