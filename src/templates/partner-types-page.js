import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Partner = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
  }

  .img-container {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  h2 {
    grid-column: 2/-1;
  }

  .description {
    text-decoration: none !important;
    color: #000;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 5fr;
  }
`

class PartnerTypePageTemplate extends React.Component {
  render() {
    const partnerType = this.props.data.contentfulPartnerTypes
    const allPartnersOfType = this.props.data.allContentfulPartner
    return (
      <Layout location={this.props.location}>
        <Helmet>
          {partnerType.name && <title>{`BAEHR - ${partnerType.name}`}</title>}
          {partnerType.metaDescription && (
            <meta
              name="description"
              content={partnerType.metaDescription.metaDescription}
            />
          )}
          {partnerType.metaKeywords && (
            <meta
              name="keywords"
              content={partnerType.metaKeywords.metaKeywords}
            />
          )}
          {/* OG Image */}
          {partnerType.pictures[0] && (
            <meta name="og:image" content={partnerType.pictures[0].file.url} />
          )}
        </Helmet>
        <Container>
          <h1>{partnerType.name}</h1>

          {allPartnersOfType != null &&
            allPartnersOfType.edges.map(({ node: partner }) => {
              return (
                <Partner key={partner.id}>
                  <Link
                    to={`/терапевтичен-педикюр/${partnerType.slug}/${partner.slug}`}
                  >
                    <h2>{partner.name}</h2>
                  </Link>
                  <div>
                    <p>{partner.phone}</p>
                    <p>{partner.site}</p>
                    <p>{partner.address}</p>
                  </div>
                </Partner>
              )
            })}
        </Container>
      </Layout>
    )
  }
}

export default PartnerTypePageTemplate

export const pageQuery = graphql`
  query partnerTypeQuery($slug: String!) {
    contentfulPartnerTypes(slug: { eq: $slug }) {
      id
      slug
      name
      description {
        childMarkdownRemark {
          html
        }
      }
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
      pictures {
        description
        id
        file {
          url
        }
      }
    }

    allContentfulPartner(
      sort: { fields: order, order: ASC }
      filter: { partnerType: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          id
          slug
          name
          phone
          site
          address
        }
      }
    }
  }
`
