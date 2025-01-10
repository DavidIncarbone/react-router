import { useState, useEffect } from "react";
import Card from "../components/Card"
import axios from "axios";
import Form from "../components/Form"

// ADD POST

const initialNewPost = {

    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: false

};



const postsAPI = "http://localhost:3000/posts";
const tagsAPI = "http://localhost:3000/tags"


function Main() {
    const [myPosts, setMyPosts] = useState([]);
    const [newPost, setNewPost] = useState(initialNewPost);
    const [postList, setPostList] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    // ***** FUNCTIONS *****
    //GET DATA
    useEffect(() => {
        getData();
        getTags()

    }, [])

    function getData() {
        axios.get(postsAPI).then((res) => {
            console.log(res.data)
            setMyPosts(res.data.data)
            console.log(res.data.data)
        })
            .catch((error) => {
                console.log(error)
            })
    }



    function getTags() {
        axios.get(tagsAPI).then((res) => {
            console.log(res.data)
            setFilteredTags(res.data.data)
        })
    }

    //DELETE
    function deleteItem(id) {
        axios.delete(postsAPI + "/" + id).then(() => getData());

    }

    //HANDLE

    function handleInput(event) {
        const name = event.target.name
        const value =
            event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setNewPost({ ...newPost, [name]: value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(postsAPI, newPost).then(() => {
            getData();
            setNewPost(initialNewPost);
            document.querySelectorAll('.tag-checkbox').forEach((ch) => {
                ch.checked = false
            });

        })

    }
    function handleTags(event) {
        setNewPost((newPost) => {
            let { tags, ...others } = newPost;
            if (tags.includes(event.target.value)) {
                tags = tags.filter((tag) => tag !== event.target.value)
            } else {
                tags = [...tags, event.target.value]
            }
            return {
                tags, ...others
            }
        })
    }
    const handleCheckboxChange = () => {
        alert('Stai per pubblicare un post!');
        handleInput(event);
    };


    return (
        <main className="d-flex flex-column">

            <div className="w-25 ms-5">
                <h2 className="ps-1">Lista dei Tags</h2>
                <ul>
                    {
                        filteredTags.map((tag, index) => {
                            return (
                                <li key={`card-tag-${index}xxx`}>{tag}</li>
                            )
                        }
                        )
                    }
                </ul>
            </div >

            <ul className="d-flex flex-wrap gap-5">
                {myPosts.filter((post) => post.published)
                    .map((post) => {
                        return (
                            <Card title={post.title}
                                description={post.content}
                                image={post.image}
                                key={post.id}
                                tags={post.tags}
                                id={post.id}
                                onDelete={() => deleteItem(post.id)}
                            />
                        )
                    })}
            </ul>
            <section className="my-4 ms-4">
                <h2>Aggiungi nuovo post</h2>
                <Form handleSubmit={() => handleSubmit(event)} handleInput={() => handleInput(event)} handleTags={() => handleTags(event)} />
            </section>


        </main >
    )
}


export default Main