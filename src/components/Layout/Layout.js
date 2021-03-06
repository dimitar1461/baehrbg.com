import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import HamburgerMenu from './HamburgerMenu'
import Contacts from '../Contacts/Contacts'
import CookieConsent from '../CookieConsent/CookieConsent'
import Footer from './Footer'
import BackToTop from '../BackToTop'

import 'normalize.css'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query menuEntriesQuery {
        allContentfulCategory(sort: { fields: order, order: ASC }) {
          edges {
            node {
              id
              slug
              title
            }
          }
        }

        contentfulHomePage {
          metaKeywords {
            metaKeywords
          }
          metaDescription {
            metaDescription
          }
          metaTitle
        }

        contentfulCookieConsent {
          message {
            message
          }
          dismiss
          deny
          moreText
          moreLink
        }
      }
    `}
    render={(data) => (
      <React.Fragment>
        <Helmet
          title={data.contentfulHomePage.metaTitle}
          meta={[
            {
              name: 'description',
              content: data.contentfulHomePage.metaDescription.metaDescription,
            },
            {
              name: 'keywords',
              content: data.contentfulHomePage.metaKeywords.metaKeywords,
            },
          ]}
        >
          <script type="application/ld+json">
            {`
              {
                "@context" : "http://schema.org",
                "@type" : "Organization",
                "name" : "Baehr Bulgaria",
              "url" : "https://www.baehrbg.com",
              "sameAs" : [
                "https://www.facebook.com/baehrbg/",
                  "https://www.instagram.com/medi_meets_pedi/"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Plovdiv, Trakia 71",
                  "postalCode": "4023",
                  "addressCountry": "BG"
                }
              }
          `}
          </script>
        </Helmet>
        <HamburgerMenu allProductPages={data.allContentfulCategory.edges} />
        {children}
        <Contacts />
        <Footer />
        <CookieConsent data={data.contentfulCookieConsent} />
        <BackToTop />
      </React.Fragment>
    )}
  />
)

export default Layout
