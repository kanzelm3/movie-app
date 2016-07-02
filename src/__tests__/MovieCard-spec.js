import React from 'react'
import { fromJS } from 'immutable'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import MovieCard from '../components/MovieCard'

const config = fromJS({
  baseUrl: 'http://placehold.it',
  backdropSizes: ['300x200']
})

const movie = fromJS({
  backdropPath: '',
  title: 'Test movie'
})

describe('<MovieCard />', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<MovieCard config={config} movie={movie} />)
  })

  it('should have an image to display the movie poster', function () {
    expect(wrapper.find('img')).to.have.length(1)
  })

  it('should have props for config and movie', function () {
    expect(wrapper.props().config).to.be.defined
    expect(wrapper.props().movie).to.be.defined
  })
})
