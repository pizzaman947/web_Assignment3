const form = document.getElementById('blogForm');
        const postsDiv = document.getElementById('posts');

        async function fetchPosts() {
            const res = await fetch('/blogs');
            const blogs = await res.json();
            postsDiv.innerHTML = blogs.map(b => `
                <div class="blog-post">
                    <h3>${b.title}</h3>
                    <small>By ${b.author} on ${new Date(b.createdAt).toLocaleDateString()}</small>
                    <p>${b.body}</p>
                    <button onclick="deletePost('${b._id}')" style="background:red">Delete</button>
                </div>
            `).join('');
        }

        form.onsubmit = async (e) => {
            e.preventDefault();
            const data = {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value || 'Anonymous',
                body: document.getElementById('body').value
            };
            await fetch('/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            form.reset();
            fetchPosts();
        };

        async function deletePost(id) {
            await fetch(`/blogs/${id}`, { method: 'DELETE' });
            fetchPosts();
        }

        fetchPosts();