import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { FaMobile } from 'react-icons/fa'
import Email from './Email'

const ContactsWrapper = styled.div`
  padding: 2rem 0;
  text-align: center;

  h3 {
    color: #c5112e;
  }
`

const Contacts = () => (
  <StaticQuery
    query={graphql`
      query contactsQuery {
        contentfulContact {
          title
          phone1
          phone2
          email1
          email2
        }
      }
    `}
    render={data => {
      const { title, phone1, phone2, email1, email2 } = data.contentfulContact

      return (
        <ContactsWrapper id="contacts">
          <h3>{title}</h3>
          <p>
            <FaMobile style={{ color: '#c5112e', marginRight: '0.5rem' }} />
            <a href={`tel:+${phone1}`}>+{phone1}</a>
          </p>
          <p>
            <FaMobile style={{ color: '#c5112e', marginRight: '0.5rem' }} />
            <a href={`tel:+${phone2}`}>+{phone2}</a>
          </p>
          <Email address={email1} />
          <Email address={email2} />
        </ContactsWrapper>
      )
    }}
  />
)

export default Contacts
