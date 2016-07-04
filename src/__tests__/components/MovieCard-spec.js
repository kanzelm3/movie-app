import React from 'react'
import { fromJS } from 'immutable'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import MovieCard from '../../components/MovieCard'
import MoviePoster from '../../components/MoviePoster'

const config = fromJS({
  baseUrl: 'http://placehold.it',
  backdropSizes: ['300x200', '680x439']
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

  it('should render a movie poster component', function () {
    expect(wrapper.find(MoviePoster)).to.have.length(1)
  })

  it('should render the movie title', function () {
    const span = wrapper.find('span')
    expect(span).to.have.length(1)
    expect(span.text()).to.equal(movie.get('title'))
  })
})
