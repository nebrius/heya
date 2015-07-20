"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.createDriver = createDriver;
Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
The MIT License (MIT)

Copyright (c) 2015 Bryan Hughes <bryan@theoreticalideations.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var types = require("../constants.js").types;

function createDriver(definition) {
  var Driver = function Driver() {
    _classCallCheck(this, Driver);

    this.type = types.DRIVER;
    this.outputs = {
      directionA: {
        x: {
          name: definition.name + "_x",
          type: types.ANALOG,
          source: definition
        },
        y: {
          name: definition.name + "_y",
          type: types.ANALOG,
          source: definition
        }
      }
    };
  };

  return Driver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyaXZlcnMvZHJpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUEwQmdCLFlBQVksR0FBWixZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRm5CLEtBQUssV0FBUSxpQkFBaUIsRUFBOUIsS0FBSzs7QUFFUCxTQUFTLFlBQVksQ0FBQyxVQUFVLEVBQUU7TUFDakMsTUFBTSxHQUNDLFNBRFAsTUFBTSxHQUNJOzBCQURWLE1BQU07O0FBRVIsUUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxPQUFPLEdBQUc7QUFDYixnQkFBVSxFQUFFO0FBQ1YsU0FBQyxFQUFFO0FBQ0QsY0FBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTtBQUM1QixjQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDbEIsZ0JBQU0sRUFBRSxVQUFVO1NBQ25CO0FBQ0QsU0FBQyxFQUFFO0FBQ0QsY0FBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTtBQUM1QixjQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDbEIsZ0JBQU0sRUFBRSxVQUFVO1NBQ25CO09BQ0Y7S0FDRixDQUFDO0dBQ0g7O0FBR0gsU0FBTyxNQUFNLENBQUM7Q0FDZiIsImZpbGUiOiJkcml2ZXJzL2RyaXZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyB0eXBlcyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEcml2ZXIoZGVmaW5pdGlvbikge1xuICBjbGFzcyBEcml2ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy50eXBlID0gdHlwZXMuRFJJVkVSO1xuICAgICAgdGhpcy5vdXRwdXRzID0ge1xuICAgICAgICBkaXJlY3Rpb25BOiB7XG4gICAgICAgICAgeDoge1xuICAgICAgICAgICAgbmFtZTogZGVmaW5pdGlvbi5uYW1lICsgJ194JyxcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLkFOQUxPRyxcbiAgICAgICAgICAgIHNvdXJjZTogZGVmaW5pdGlvblxuICAgICAgICAgIH0sXG4gICAgICAgICAgeToge1xuICAgICAgICAgICAgbmFtZTogZGVmaW5pdGlvbi5uYW1lICsgJ195JyxcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLkFOQUxPRyxcbiAgICAgICAgICAgIHNvdXJjZTogZGVmaW5pdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gRHJpdmVyO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9