import { useParams } from "react-router-dom";


export default function PostInfo() {
    const { id } = useParams();
    return (
        <h2 className="text-center">Sono il post con id {id}</h2>
    )
}