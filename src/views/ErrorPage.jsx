import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="">
      <h1 className="title404">404 - Page non trouvée</h1>
      <p className="text404">La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible.</p>
      <Link className="redirectHome" to="/">Retourner à la page principale</Link>
    </div>
  )
}