import { useState, useEffect } from "react";
import Card from "./Card"
import axios from "axios";

// ADD POST



const initialNewPost = {

    title: "",
    description: "",
    image: "",
    category: "",
    tags: [],
    status: false

};

const options = ["Cinema", "Calcio", "Viaggi"];
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

        axios.delete(postsAPI + "/" + id);
        setMyPosts(myPosts.filter((post) => post.id !== id))


    }
    function deleteNewItem(id) {
        axios.delete(postsAPI + "/" + id);
        setPostList(
            postList.filter((post) => post.id !== id)
        )
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
        axios.post(postsAPI, newPost)
        setPostList([...postList, newPost]);
        console.log(newPost)
        setNewPost(initialNewPost);
        console.log(postList);
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
                                < li key={`card-tag-${index}xxx`}>{tag}</li>
                            )
                        }
                        )
                    }

                </ul>
            </div >

            <ul className="d-flex flex-wrap gap-5">


                {myPosts.map(post => (
                    post.published &&
                    <Card title={post.title}
                        description={post.content}
                        image={post.image}
                        key={self.crypto.randomUUID()}
                        tags={post.tags}
                        onDelete={() => deleteItem(post.id)}
                    />
                ))}

                {postList.filter((post) => post.status)
                    .map((post) => {
                        return (
                            <Card title={post.title}
                                description={post.description}
                                image={post.image}
                                key={post.id}
                                tags={post.tags}
                                onDelete={() => deleteNewItem(post.id)}
                            />
                        )
                    })}
            </ul>
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
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="textarea"
                            className="form-control"
                            id="description"
                            aria-describedby="descriptionlHelp"
                            onChange={handleInput}
                            value={newPost.description}
                            name="description"
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
                                    className="form-check-input"
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
                        id="status"
                        name="status"
                        onChange={
                            handleCheckboxChange


                        }
                        checked={newPost.status}

                    />
                    <label className="form-check-label ms-1" htmlFor="status">
                        Pubblica
                    </label>


                    <button type="submit" className="btn btn-primary ms-3">
                        Submit
                    </button>
                </form>
            </section>


        </main >
    )
}


export default Main