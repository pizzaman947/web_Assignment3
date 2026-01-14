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
                    <button onclick="editPost('${b._id}')" style="background:orange">Edit</button>
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
        
            if (editId) {
                await fetch(`/blogs/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                editId = null; 
                document.querySelector('button[type="submit"]').innerText = 'Add Post';
            } else {
                await fetch('/blogs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        
            form.reset();
            fetchPosts();  
        };

        async function deletePost(id) {
            await fetch(`/blogs/${id}`, {
                 method: 'DELETE' 
                });
            fetchPosts();
        }
        let editId = null;  

        async function editPost(id) {
        const res = await fetch(`/blogs/${id}`);
        const blog = await res.json();
        document.getElementById('title').value = blog.title;
        document.getElementById('author').value = blog.author;
        document.getElementById('body').value = blog.body;
        editId = id;
        document.querySelector('button[type="submit"]').innerText = 'Update Post';





   

}

        fetchPosts();