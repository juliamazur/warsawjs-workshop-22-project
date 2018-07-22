
const template = `
  <div class="application">
    <div class="title">Wirtualny Kantor</div>
    <div id="rates"></div>
    <div class="form">
      <form>
        <div class="form-row">
          <label>
            <input type="radio" name="operation" value="buy"> Kupuje
          </label>
          <label>
            <input type="radio" name="operation" value="sell"> Sprzedaje
          </label>
        </div>
        <div class="form-row">
          <label>
            Sprzedaje <select name="currency-from"></select>
          </label>
          <label>
            Kupuje <select name="currency-to"></select>
          </label>
        </div>
        <div class="form-row">
          <label>
            Kwota
            <input type="number" />
          </label>
        </div> 
      </form>
    </div>
  </div>
`;

class Application {

    initialize(root) {
        root.innerHTML = template;
    }

    test() {
        return 'zupa';
    }

    fetchUsd() {
        // const usdUrl = 'https://api.nbp.pl/api/exchangerates/rates/a/usd/';
        // return fetch(this.usdUrl).then(function() {
        //     return response.json();
        // })

        fetch('https://api.nbp.pl/api/exchangerates/rates/a/usd/')
            .then(function(response) {
                return response.json()
            }).then(function(json) {
            var data = json;
            console.log(data[0]);
            console.log(data[0].username);
            component.setState({
                data: json
            })
        })
    }

    fetch(url) {
        fetch(url)
            .then(function() {
                return response.json();
            })
            .catch(function() {
                throw new Error('API Fetch Error.');
            });
    }
}

document.addEventListener('DOMContentLoaded', function(){
    const app = new Application();
    app.initialize(document.getElementById('root'));
    document.getElementById('rates').innerText = app.fetchUsd();
})
