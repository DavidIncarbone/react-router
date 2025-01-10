import Form from "../components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialNewPost = {

    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: false

};


const options = ["Cinema", "Calcio", "Viaggi"];
const postsAPI = "http://localhost:3000/posts";
const tagsAPI = "http://localhost:3000/tags"


export default function AddPost() {
    const [myPosts, setMyPosts] = useState([]);
    const [newPost, setNewPost] = useState(initialNewPost);
    const [filteredTags, setFilteredTags] = useState([]);
    const tagsAPI = "http://localhost:3000/tags";
    const navigate = useNavigate();

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

    useEffect(() => {

        getTags()

    }, [])

    function getTags() {
        axios.get(tagsAPI).then((res) => {
            console.log(res.data)
            setFilteredTags(res.data.data)
        })
    }

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
                navigate("/posts");
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
    const handlePublish = () => {
        alert('Stai per pubblicare un post!');
        handleInput(event);
    };

    return (
        <section className="my-4 ms-4">
            <h2>Aggiungi nuovo post</h2>
            <form onSubmit={handleSubmit} className="w-50">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titlelHelp"
                        onChange={handleInput}
                        value={newPost.title}
                        name="title"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Description
                    </label>
                    <input
                        type="textarea"
                        className="form-control"
                        id="content"
                        aria-describedby="contentlHelp"
                        onChange={handleInput}
                        value={newPost.content}
                        name="content"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        aria-describedby="imagelHelp"
                        onChange={handleInput}
                        value={newPost.image}
                        name="image"
                    />
                </div>
                <select className="form-select mb-3" aria-label="Default select example" type="textarea"
                    id="category"
                    aria-describedby="categorylHelp"
                    onChange={handleInput}
                    value={newPost.category}
                    name="category">
                    <option defaultValue>Scegli la categoria</option>
                    {options.map((option) => {
                        return (<option key={crypto.randomUUID()} value={option}>{option}</option>)
                    })}
                </select>

                {filteredTags.map((tag) => {
                    return (
                        <div className="mb-3 form-check" key={tag}>
                            <input
                                type="checkbox"
                                className="form-check-input tag-checkbox"
                                id="avaiable"
                                name="available"
                                onChange={handleTags}
                                value={tag}

                            />
                            <label className="form-check-label" htmlFor="avaiable">
                                {tag}
                            </label>
                        </div>
                    )
                })}
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="published"
                    name="published"
                    onChange={
                        handlePublish
                    }
                    checked={newPost.published}
                    value={newPost.published}

                />
                <label className="form-check-label ms-1" htmlFor="status">
                    Pubblica
                </label>


                <button type="submit" className="btn btn-primary ms-3">
                    Submit
                </button>
            </form>
        </section>

    )
}


