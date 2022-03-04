import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@mui/styles';
import CategoryList from '../../components/Admin/ListItem/ListItem';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import * as actions from '../../store/actions';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class Categories extends Component {

  state = {
    page: 1
  }
  
  componentDidMount () {
    this.props.onFetchCategories()
  }
  
  onChangePaging = (event, page) => {
    event.preventDefault();
    this.props.onFetchCategories(page)
    this.setState({
      page: page
    })
  }


  render () {
    const { classes } = this.props;
    const categories = this.props.categories
    const rowData = [
      {
        label: 'Image',
        name: 'image',
        renderValue: (elements) => (
          <img 
            src={elements.image} 
            className={elements.styleName ? elements.styleName: ''} 
            alt={elements.name} 
          />
        ),
        styles: {
          size: "small"
        }
      },
      {
        label: 'Name',
        name: 'name',
        styles: {

        }
      }
    ]
    return (
      <LayoutContent>
        <CategoryList 
          xs={12}
          title='Categories'
          heightRow={60}
          rowData={rowData}
          currentPage={this.state.page} 
          paperClasses={classes.paper} 
          data={categories} 
          totalCount={this.props.totalCount} 
          onChangePaging={this.onChangePaging}/>
      </LayoutContent>
    )
  }
};

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    totalCount: state.category.totalCount,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCategories: (page=1) => dispatch(actions.getCategories(page)),
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Categories));