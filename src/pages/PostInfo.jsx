import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const infoPostAPI = "http://localhost:3000/posts/"

export default function PostInfo() {

    const { id } = useParams();
    const [post, setPost] = useState({});

    // 3
    useEffect(getInfo, [id])

    function getInfo() {
        axios.get(infoPostAPI + id).then((res) => {
            // 4
            console.log(res.data.item)
            setPost(res.data.item)
            console.log(post) // null
        }).catch((error) => {
            console.log(error)
        })
            .finally(() => {
                console.log("finally")
            });

    }

    // 5 post =
    console.log(post) // 1

    // 2 post
    return (

        <div id="container" className="container pb-5">
            <h2 className="text-center py-3 text-bg-danger">{post.title}</h2>
            <div id="info-img-container" className="w-25 me-3">
                <img id="info-post" src={post.image} alt={post.title} />
            </div>
            <div className="my-3">
                <h5 className="text-center">Descrizione</h5>
                <p className="ms-3">{post.content}
                </p>
            </div>
        </div>

    )
}



