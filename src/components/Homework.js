import { Link } from "react-router-dom"

const Homework = () => {
    return (
        <section>
            <h1>Homeworks Page</h1>
            <br />
            <p>You must have been assigned an Homework .</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Homework