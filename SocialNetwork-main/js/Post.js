class Post {
    post_id = '';
    post_content = '';
    user_id = '';
    likes = '';
    api_url = 'https://679fab9424322f8329c455b7.mockapi.io';

    async create() {
        let session = new Session();
        let session_id = session.getSession();

        let data = {
            user_id: session_id,
            content: this.post_content,
            likes: 0
        };

        data = JSON.stringify(data);

        let response = await fetch(this.api_url + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        data = await response.json();
        return data;
    }

    async getAllPosts() {
        let response = await fetch(this.api_url + '/posts');
        let data = await response.json();
        return data;
    }

    like(post_id, likes) {
    	let data = {
			    likes: likes,
			};

			data = JSON.stringify(data);

			fetch(this.api_url + '/posts/' + post_id, {
			    method: 'PUT',
			    headers: {
			        'Content-Type': 'application/json',
			    },
			    body: data
			})
			.then(response => response.json())
			.then(data => {alert('Post liked!')});

    }

    async delete(post_id) {
        try {
            const response = await fetch(this.api_url + '/posts/' + post_id, {  // Ispravljeno na 'posts'
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // Ispravljeno 'josn()' na 'json()'
            alert('Post obrisan');
        } catch (error) {
            console.error('Greška pri brisanju:', error);
        }
    }
}
