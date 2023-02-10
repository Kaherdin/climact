import { gql } from "@apollo/client";
import client from "@/context/Apollo";

/*************** FRAGMENTS ***************/
//Global
const navbarDetailFragment = gql`
  fragment navbarDetailFragment on ComponentGlobalNavbar {
    nav_links {
      title
      link
    }
    nav_buttons {
      text
      outline
      color
      link
      fa_icon
    }
    logo {
      data {
        attributes {
          url
          alternativeText
          caption
          name
          provider_metadata
        }
      }
    }
  }
`;

//Global
const seoDetailFragment = gql`
  fragment seoDetailFragment on ComponentSharedSeo {
    metaTitle
    metaImage {
      data {
        attributes {
          url
          provider_metadata
        }
      }
    }
    metaRobots
    metaDescription
    metaViewport
    keywords
    structuredData
    metaSocial {
      description
      title
      socialNetwork
      image {
        data {
          attributes {
            url
          }
        }
      }
    }
  }
`;

//Member
const memberDetailFragment = gql`
  fragment memberDetailFragment on Member {
    types {
      data {
        attributes {
          title
          order
        }
      }
    }
    tags {
      data {
        attributes {
          name
        }
      }
    }
    website_link
    title
    name
    email
    surname
    twitter
    biography
    linkedin
    twitter
    affiliation_uni
    affiliation_fac
    job_title

    avatar {
      data {
        attributes {
          provider_metadata
          url
        }
      }
    }
  }
`;

//Event
const eventDetailFragment = gql`
  ${memberDetailFragment}
  fragment eventDetailFragment on Event {
    locale
    title
    subtitle
    excerpt
    createdAt
    startDate
    duration
    zoom_link
    subscribe_link
    slug
    venue
    event_type
    tags {
      data {
        attributes {
          name
        }
      }
    }
    cover {
      data {
        attributes {
          url
          size
          provider
          formats
          alternativeText
          caption
          provider_metadata
          caption
        }
      }
    }
    presenters {
      description
      title
      member {
        data {
          attributes {
            ...memberDetailFragment
          }
        }
      }
    }
  }
`;

//Post
const postDetailFragment = gql`
  ${memberDetailFragment}
  fragment postDetailFragment on Post {
    locale
    title
    subtitle
    excerpt
    content
    createdAt
    slug
    tags {
      data {
        attributes {
          name
        }
      }
    }
    cover {
      data {
        attributes {
          url
          size
          provider
          formats
          alternativeText
          caption
          provider_metadata
          caption
        }
      }
    }
    authors {
      data {
        attributes {
          ...memberDetailFragment
        }
      }
    }
    experts {
      data {
        attributes {
          ...memberDetailFragment
        }
      }
    }
  }
`;

//Project
const projectDetailFragment = gql`
  ${memberDetailFragment}
  fragment projectDetailFragment on Project {
    locale
    title
    subtitle
    slug
    order
    docs_links {
      link
      text
    }
    cover {
      data {
        attributes {
          url
          size
          provider
          formats
          alternativeText
          caption
          provider_metadata
          caption
        }
      }
    }
    gallery {
      data {
        attributes {
          url
          size
          provider
          formats
          alternativeText
          caption
          provider_metadata
          caption
        }
      }
    }
    milestones {
      date
      text
    }
    objective
    challenge
    output
    funding
    co2
    sdgs {
      data {
        attributes {
          link
          logo {
            data {
              attributes {
                provider_metadata
                alternativeText
                url
              }
            }
          }
        }
      }
    }
    tags {
      data {
        attributes {
          name
        }
      }
    }
    partners {
      data {
        attributes {
          link
          name
          logo {
            data {
              attributes {
                provider_metadata
                alternativeText
                url
                height
                width
                size
              }
            }
          }
        }
      }
    }
    collaborators {
      data {
        attributes {
          ...memberDetailFragment
        }
      }
    }
    leaders {
      data {
        attributes {
          ...memberDetailFragment
        }
      }
    }
    gallery {
      data {
        attributes {
          url
          size
          provider
          formats
          alternativeText
          caption
          provider_metadata
          caption
        }
      }
    }
  }
`;

/*************** PROJECT ***************/
export const PROJECTS_TAGS_PAGINATION = gql`
  ${projectDetailFragment}
  query projects(
    $start: Int
    $limit: Int
    $locale: I18NLocaleCode!
    $tag: String
  ) {
    projects(
      locale: $locale
      sort: "order:desc"
      pagination: { start: $start, limit: $limit }
      filters: { tags: { name: { contains: $tag } } }
    ) {
      data {
        id
        attributes {
          ...projectDetailFragment
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
    }
  }
`;

export const PROJECTS_PAGINATION = gql`
  ${projectDetailFragment}
  query projects($start: Int, $limit: Int, $locale: I18NLocaleCode!) {
    projects(
      locale: $locale
      sort: "order:desc"
      pagination: { start: $start, limit: $limit }
    ) {
      data {
        id
        attributes {
          ...projectDetailFragment
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
    }
  }
`;

export const PROJECTS = gql`
  ${projectDetailFragment}
  query projects($locale: I18NLocaleCode!) {
    projects(
      locale: $locale
      sort: "createdAt:asc"
      pagination: { start: 0, limit: 100 }
    ) {
      data {
        id
        attributes {
          ...projectDetailFragment
        }
      }
    }
  }
`;

export const PROJECTS_TAG = gql`
  ${projectDetailFragment}
  query projects($tag: String!) {
    projects(
      sort: "createdAt:desc"
      filters: { tags: { name: { eq: $tag } } }
    ) {
      data {
        id
        attributes {
          ...projectDetailFragment
        }
      }
    }
  }
`;

export const PROJECT = gql`
  ${projectDetailFragment}
  ${seoDetailFragment}
  query projects($locale: I18NLocaleCode!, $slug: String!) {
    projects(
      publicationState: PREVIEW
      locale: $locale
      filters: { slug: { eq: $slug } }
    ) {
      data {
        id
        attributes {
          ...projectDetailFragment
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          seo {
            ...seoDetailFragment
          }
        }
      }
    }
  }
`;

/*************** MEMBER ***************/
export const MEMBERS_BY_ID = gql`
  ${memberDetailFragment}
  query members($type: ID!) {
    members(
      sort: "surname:asc"
      pagination: { start: 0, limit: 100 }
      filters: { types: { id: { eq: $type } } }
    ) {
      data {
        id
        attributes {
          ...memberDetailFragment
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
    }
  }
`;

export const MEMBERS = gql`
  ${memberDetailFragment}
  query members {
    members(sort: "surname:asc", pagination: { start: 0, limit: 100 }) {
      data {
        id
        attributes {
          ...memberDetailFragment
        }
      }
    }
  }
`;

export const MEMBER_ID = gql`
  ${memberDetailFragment}
  query members($id: ID!) {
    member(id: $id) {
      data {
        id
        attributes {
          ...memberDetailFragment
        }
      }
    }
  }
`;

export const MEMBER = gql`
  ${memberDetailFragment}
  query members($slug: String!) {
    members(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...memberDetailFragment
        }
      }
    }
  }
`;

/*************** TYPES ***************/
export const TYPES = gql`
  query types {
    types(sort: "order:asc", pagination: { start: 0, limit: 100 }) {
      data {
        id
        attributes {
          title
          order
          members {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

/*************** PARTNERS ***************/
export const PARTNERS = gql`
  query partners {
    partners(pagination: { start: 0, limit: 100 }) {
      data {
        id
        attributes {
          name
          link
          logo {
            data {
              attributes {
                provider_metadata
                url
              }
            }
          }
        }
      }
    }
  }
`;

/*************** EVENTS ***************/
export const EVENTS_PAGINATION = gql`
  ${eventDetailFragment}
  query events($start: Int, $limit: Int, $locale: I18NLocaleCode!) {
    events(
      locale: $locale
      sort: "createdAt:desc"
      pagination: { start: $start, limit: $limit }
    ) {
      data {
        id
        attributes {
          ...eventDetailFragment
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
    }
  }
`;

export const NEXT_EVENTS_PAGINATION = gql`
  ${eventDetailFragment}
  query events(
    $start: Int
    $now: DateTime!
    $limit: Int
    $locale: I18NLocaleCode!
  ) {
    events(
      locale: $locale
      sort: "createdAt:desc"
      filters: { startDate: { gte: $now } }
      pagination: { start: $start, limit: $limit }
    ) {
      data {
        id
        attributes {
          ...eventDetailFragment
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
    }
  }
`;

export const EVENTS = gql`
  ${eventDetailFragment}
  query events($locale: I18NLocaleCode!) {
    events(locale: $locale, sort: "createdAt:desc") {
      data {
        id
        attributes {
          ...eventDetailFragment
        }
      }
    }
  }
`;

export const EVENT = gql`
  ${eventDetailFragment}
  ${seoDetailFragment}
  query events($locale: I18NLocaleCode!, $slug: String!) {
    events(
      publicationState: PREVIEW
      locale: $locale
      filters: { slug: { eq: $slug } }
    ) {
      data {
        id
        attributes {
          ...eventDetailFragment
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          seo {
            ...seoDetailFragment
          }
        }
      }
    }
  }
`;

export const EVENT_ID = gql`
  ${eventDetailFragment}
  query event($id: ID!) {
    event(id: $id) {
      data {
        id
        attributes {
          ...eventDetailFragment
        }
      }
    }
  }
`;
/*************** TAGS ***************/
export const TAGS = gql`
  query tags {
    tags(sort: "name:asc", pagination: { limit: 100, start: 0 }) {
      data {
        attributes {
          name
          posts {
            data {
              id
            }
          }
          members {
            data {
              id
            }
          }
          projects {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

/*************** POSTS ***************/
export const POSTS_TAGS_PAGINATION = gql`
  ${postDetailFragment}
  query posts(
    $start: Int
    $limit: Int
    $locale: I18NLocaleCode!
    $tag: String
  ) {
    posts(
      locale: $locale
      sort: "order:desc"
      pagination: { start: $start, limit: $limit }
      filters: { tags: { name: { contains: $tag } } }
    ) {
      data {
        id
        attributes {
          ...postDetailFragment
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
    }
  }
`;

export const POSTS_PAGINATION = gql`
  ${postDetailFragment}
  query posts($start: Int, $limit: Int, $locale: I18NLocaleCode!) {
    posts(
      locale: $locale
      sort: "createdAt:desc"
      pagination: { start: $start, limit: $limit }
    ) {
      data {
        id
        attributes {
          ...postDetailFragment
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
    }
  }
`;

export const POSTS = gql`
  ${postDetailFragment}
  query posts($locale: I18NLocaleCode!) {
    posts(
      locale: $locale
      sort: "createdAt:desc"
      publicationState: PREVIEW
      pagination: { start: 0, limit: 100 }
    ) {
      data {
        id
        attributes {
          ...postDetailFragment
        }
      }
    }
  }
`;

export const POSTS_TAG = gql`
  ${postDetailFragment}
  query posts($tag: String!) {
    posts(
      sort: "createdAt:desc"
      filters: { tags: { name: { contains: $tag } } }
    ) {
      data {
        id
        attributes {
          ...postDetailFragment
        }
      }
    }
  }
`;

export const POST = gql`
  ${postDetailFragment}
  ${seoDetailFragment}
  query posts($locale: I18NLocaleCode!, $slug: String!) {
    posts(
      publicationState: PREVIEW
      locale: $locale
      filters: { slug: { eq: $slug } }
    ) {
      data {
        id
        attributes {
          ...postDetailFragment
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          seo {
            ...seoDetailFragment
          }
        }
      }
    }
  }
`;

export const POST_ID = gql`
  ${postDetailFragment}
  query posts($id: ID!) {
    post(id: $id) {
      data {
        id
        attributes {
          ...postDetailFragment
        }
      }
    }
  }
`;

/*************** PAGE ***************/
export const PAGE_POST_LIST = gql`
  ${seoDetailFragment}
  query pagePostList($locale: I18NLocaleCode!) {
    pagePostList(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_FUNDING = gql`
  ${seoDetailFragment}
  query pageFunding($locale: I18NLocaleCode!) {
    pageFunding(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          content_2023
          content_2022
          content_2021
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_PROJECT = gql`
  ${seoDetailFragment}
  query pageProject($locale: I18NLocaleCode!) {
    pageProject(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          view_all_btn
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
          project_categories {
            challenge_title
            leader_title
            collaborator_title
            milestone_title
            funding_title
            gallery_title
            objective_title
            links_documents_title
            partner_title
            sdg_title
            output_title
          }
        }
      }
    }
  }
`;

export const PAGE_HOME = gql`
  ${seoDetailFragment}
  query pageHome($locale: I18NLocaleCode!) {
    pageHome(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          about
          events_title
          projects_title
          posts_title
          visit_social
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_EVENT = gql`
  ${seoDetailFragment}
  query pageEvent($locale: I18NLocaleCode!) {
    pageEvent(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
          previous_episode
          venue
          visio_link
          presented_by
          add_google
          add_outlook
          add_calendar
          download_ics
          next_events
          past_events
          read_more
          view_all_btn
          date
          time
          subscribe
          no_next_events
        }
      }
    }
  }
`;

export const PAGE_BLOG = gql`
  ${seoDetailFragment}
  query pageBlog($locale: I18NLocaleCode!) {
    pagePostList(locale: $locale) {
      data {
        id
        attributes {
          title
          subtitle
          subtitleRTE
          seo {
            ...seoDetailFragment
          }
          read_more
          view_all_btn
          posted_on
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_MEMBER = gql`
  ${seoDetailFragment}
  query pageMember($locale: I18NLocaleCode!) {
    pageMember(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_CONTACT = gql`
  ${seoDetailFragment}
  query pageContact($locale: I18NLocaleCode!) {
    pageContact(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_ABOUT = gql`
  ${seoDetailFragment}
  query pageAbout($locale: I18NLocaleCode!) {
    pageAbout(locale: $locale) {
      data {
        id
        attributes {
          seo {
            ...seoDetailFragment
          }
          title
          subtitle
          subtitleRTE
          cover {
            data {
              attributes {
                url
                size
                provider
                formats
                alternativeText
                caption
                provider_metadata
                caption
              }
            }
          }
          what
          climact_members_title
          executive_members_title
          steering_members_title
          indicators_title
          how_title
          mission_how {
            id
            icon
            title
            text
          }
          indicators {
            id
            number
            text
            link
          }
        }
      }
    }
  }
`;

/*************** GLOBAL ***************/
export const GET_NAVBAR = gql`
  ${navbarDetailFragment}
  query Navbar {
    global {
      data {
        id
        attributes {
          navbar {
            ...navbarDetailFragment
          }
        }
      }
    }
  }
`;

export const GET_GLOBAL = gql`
  ${navbarDetailFragment}
  query global($locale: I18NLocaleCode!) {
    global(locale: $locale) {
      data {
        id
        attributes {
          locale
          title
          close_btn
          authors
          experts
          filter
          date
          leaders
          collaborators
          partners
          sdg
          first_name
          last_name
          email
          your_message
          contact_btn
          load_more
          act_now {
            title
            subtitle
          }
          navbar {
            ...navbarDetailFragment
          }
          footer {
            newsletter_title
            subscribe
            inscription_confirmed
            accept_terms_label
            accept_term_message
            logo {
              data {
                attributes {
                  url
                  size
                  provider
                  formats
                  alternativeText
                  caption
                  provider_metadata
                  caption
                }
              }
            }
            logo_unil {
              data {
                attributes {
                  url
                  size
                  provider
                  formats
                  alternativeText
                  caption
                  provider_metadata
                  caption
                }
              }
            }
            logo_epfl {
              data {
                attributes {
                  url
                  size
                  provider
                  formats
                  alternativeText
                  caption
                  provider_metadata
                  caption
                }
              }
            }
          }
        }
      }
    }
  }
`;
