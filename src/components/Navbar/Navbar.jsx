import { Link } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary ">
			<div className="container-fluid">
				<a className="navbar-brand" href="https://silver-fiesta-pjgg9r55qxrrcr54v-3000.app.github.dev">
					<img
						src="https://cdn.worldvectorlogo.com/logos/star-wars-2.svg" 
						alt="Death Star"
						className="btn starwarsLogo"
						width="200"
						height="80"
					/>
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse d-flex justify-content-around" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Favorites
							</a>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" href="#">Items</a></li>

							</ul>
						</li>

					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
};