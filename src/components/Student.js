import { Link } from "react-router-dom"

const Student = () => {
    return (
        <section>
            <h1>Students Page</h1>
            <br />
            <p>You must have been assigned an Student role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Student