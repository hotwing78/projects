// This is my Model

let dogModel = Backbone.Model.extend({
    defaults: {
        color: 'brown',
        hair: 'shaggy',
        size: 'big'
    },

    bark: function() {
        console.log('woof');
    },
});


// This is a view
let dogView1 = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.showLassie, this)
    },

    events: {
        'click button': 'showLassie',
    },

    showLassie: function() {
        console.log('click');
        console.log(this.model.get('color'));
        let colorField = document.getElementById('color');
        let hairField = document.getElementById('hair');
        let sizeField = document.getElementById('size');

        colorField.textContent = this.model.get('color');
        hairField.textContent = this.model.get('hair');
        sizeField.textContent = this.model.get('size');
    }
});


let dogView2 = Backbone.View.extend({

    events: {
        'click button': 'showClifford',
    },

    showClifford: function() {
        console.log('click');
        console.log(this.model.get('color'));
        this.model.set({
            'color': 'yellow'
        });

    }
});

// This is a route
let dogRoute = Backbone.Router.extend({
    initialize: function() {
        let lassie = new dogModel();
        lassie.set({
            color: 'red'
        });

        this.view = new dogView1({
            model: lassie,
            el: document.querySelector('.part1'),
        });

        this.anotherView = new dogView2({
            model: lassie,
            el: document.querySelector('.part2'),
        });
    },

    routes:{
      'lassie': 'showLassie',
      'clifford': 'showClifford',
    },

    showLassie: function(){
      console.log('lassie');
      this.view.el.classList.add('hidden');
      this.anotherView.el.classList.remove('hidden');

    },
    showClifford: function(){
      console.log('clifford');
      this.anotherView.el.classList.add('hidden');
      this.view.el.classList.remove('hidden');
    }
});


window.addEventListener('load', function() {

    let router = new dogRoute();
    Backbone.history.start();
});
