import { useRouteError } from 'react-router'
import classes from './ErrorBoundary.module.css'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function ErrorBoundary(props){
  const error=useRouteError()
  console.error(error);
  return <main className={classes.wrapper}>
    <article className={classes.header}>
      <Header></Header>
    </article>
    <article className={classes.body}>
    <h1>Something went wrong!</h1>
    </article>
    <article className={classes.footer}>
      <Footer></Footer>
    </article>
  </main>
}