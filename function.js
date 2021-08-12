const container = Vue.createApp({
    data() {
        return {
            target: '',
            title: '',
            description: '',
            domain: '',
            image: '',
            url: '',
            text: ''
        }
    },

    methods: {
        search(target) {
            fetch('./get_data.php?target=' + target)
            .then(res => {
                return res.json();
            }).then(result => {
                if (result['og:title'].length > 10) {
                    this.title = result['og:title'].slice(0, 10) + '...';
                } else {
                    this.title = result['og:title'];
                }
                if (result['og:description'].length > 50) {
                    this.description = result['og:description'].slice(0, 50) + '...';
                } else {
                    this.description = result['og:description'];
                }
                this.image = result['og:image'];
                this.url = result['og:url'];
            });
        },

        getImage() {
            if (this.image === '') {
                this.image = 'https://qaz5823091.github.io/images/favicons/favicon-194x194.png';
            }
            return this.image;
        },

        forward(url) {
            if (url !== '') {
                var go = document.createElement('a');
                go.setAttribute('href', url);
                go.setAttribute('target', '_blank');
                go.click();
            }
        }
    },
});

document.addEventListener('DOMContentLoaded', () => {
    container.mount('#container');
});
