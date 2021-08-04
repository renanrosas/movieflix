import Button from "components/Button";
import './styles.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestBackend } from "util/requests";
import { Review } from "types/review";
import { AxiosRequestConfig } from "axios";
import { ReactComponent as StarIcon } from 'assets/images/star.svg';
import { SpringPage } from "types/vendor/spring";
import { hasAnyRoles } from "util/auth";

type UrlParams = {
    movieId: string;
};

const MovieDetails = () => {

    const { movieId } = useParams<UrlParams>();
    const [page, setPage] = useState<SpringPage<Review>>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            url: `/movies/${movieId}/reviews`,
            withCredentials: true,
        }
        requestBackend(params)
            .then(response => {
                setPage(response.data);
            })
    }, [movieId]);

    return (
        <div className="movie-details-container">
            <div className="title-container">
                <h2>Tela detalhes do filme id: 1</h2>
            </div>
            {hasAnyRoles(['ROLE_MEMBER']) &&
                <div className="base-card card-form">
                    <form action="">
                        <input type="text" className="form-control base-input" placeholder="Deixe sua avaliação aqui" />
                        <Button text="Salvar avaliação" />
                    </form>
                </div>
            }

            <div className="base-card card-evaluation">

                {page?.content.map((review) => (
                    <div key={review.id}>
                        <div className="name-container">
                            <StarIcon />
                            <h6>{review.user.name}</h6>
                        </div>
                        <div className="comment-container">
                            <p>{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MovieDetails;