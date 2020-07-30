import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import ItemPage from "./ItemPage";

class ItemList extends Component {
  render() {
    const {products} = this.props;
    console.log(products);
    const items = products.filter((item) => item.categoryId === 4);
    return (
      <div>
        <h1>Items</h1>
        <div>
          <ul>
            {items.map((item) => {
              return (
                <div>
                  <Link to={`/items/${item.id}`} key={item.id}>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </ul>
          <Route
            path="/items/:id"
            component={ItemPage}
            render={({match}) => {
              return {match};
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({products}) => ({products});

export default connect(mapStateToProps)(ItemList);
