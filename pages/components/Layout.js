import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Header userObject={props.userObject} />
      <main>{props.children}</main>
      <footer />
    </>
  );
}
