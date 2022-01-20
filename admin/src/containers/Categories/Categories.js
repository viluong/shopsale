import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@mui/styles';
import CategoryList from '../../components/Admin/Categories/Categories';
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
  
  componentDidMount () {
    this.props.onFetchCategories()
  }
  
  onChangePaging = (event, page) => {
    event.preventDefault();
    this.props.onFetchCategories(page)
  }


  render () {
    const { classes } = this.props;
    let categories = this.props.categories
  
    return (
      <LayoutContent>
        <CategoryList xs={12} paperClasses={classes.paper} categories={categories} totalCount={this.props.totalCount} onChangePaging={this.onChangePaging}/>
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