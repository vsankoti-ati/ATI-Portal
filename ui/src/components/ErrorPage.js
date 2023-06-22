import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mt-3">Oops!</h1>
                    <p>Sorry, an unxexpected error has occurred.</p>
                    <p>
                        <em>{error.StatusText || error.Message }</em>
                    </p>
                    
                </div>
            </div>
        </div>
    )
}