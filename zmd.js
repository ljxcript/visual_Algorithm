(function(win){
        function zmd() {
          this.config = {
            totalN: 10,
            cycleN: 5,
            startIndex: 0,
            interval: 2000,
          };
          this.style = `
            #zmd-container .zmd-item {
              border-radius: 100%;
              width: 30px;
              height: 30px;
              display: inline-block;
              margin: 5px;
              background-color: rgb(240,240,240);
            }
          `
          this.init = (name = "zmd", {totalN, cycleN, startIndex, interval})=> {
            if (typeof this.instance === "undefined") {
              this.config =  {totalN, cycleN, startIndex, interval}
              Object.defineProperty(this, "instance", {value: true, writable: false});
              this.colors = this.getColors(cycleN);
              this.currentIndex = startIndex;
              document.body.innerHTML = this.getItemHTML({totalN,cycleN})

              this.setColors();
              setInterval(()=>{this.setColors()}, interval)
              return true;
            } else {
              return false;
            }
          };
          this.getItemHTML = ({totalN, cycleN} = this.defaultConfig)=>{
            let style = document.createElement('style');
            style.innerHTML = this.style;
            document.head.appendChild(style)
            let html = "<div id='zmd-container'><ul>";
            for (let i = 0; i < totalN; i++) {
              html += "<li class='zmd-item'></li>"
            }
            html += '</ul></div>';
            return html;
          }
          this.getColors = (n = this.defaultConfig.cycleN)=>{
            let colors = [];
            function getC() {
              return Math.floor(Math.random()*256);
            }
            for (let i = 0; i < n; i++) {
              colors.push(`rgba(${getC()},${getC()}, ${getC()}, 0.7)`)
            }
            return colors;
          }
          this.setColors = ()=>{
            let activeItems = document.querySelectorAll('.zmd-item')
            activeItems.forEach(item=>{
              item.style.backgroundColor = "rgb(240,240,240)";
            })
            this.colors.forEach( (color, index)=> {
              activeItems[(this.currentIndex+index)%this.config.totalN].style.backgroundColor = color;
            })
            this.currentIndex = (this.currentIndex+1)%this.config.totalN;
          }


        }
        win.$zmd = new zmd();
      })(window)
      //the class definition and initialization

      /*using example
      @totalN----the total number of items
      @cycleN----number of items for cycling. Their colors are generated randomly
      @startIndex
      @interval----intervalTime, smaller means faster
      */
      let zmd = window.$zmd.init("myzmd", {totalN: 20, cycleN: 10, startIndex: 0, interval: 50});
      if (zmd) {
        console.log('zmd initialized succeeded!')
      } else {
        document.write('sorry, but nothing happens')
      }
