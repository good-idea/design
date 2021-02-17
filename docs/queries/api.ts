import groq from 'groq'

export const API_QUERY = groq`
  * [_type == 'api.package' && name == $name] {
    name,
    latestRelease->{
      version,
      members[]->{
        _type == 'api.class' => {
          'type': 'class',
          name,
          releaseTag,
          returnTypeTokens[]->{
            text
          }
        },
        _type == 'api.function' => {
          'type': 'function',
          name,
          releaseTag,
          returnTypeTokens[]->{
            text
          }
        },
        _type == 'api.variable' => {
          'type': 'variable',
          name,
          releaseTag,
          typeTokens[]->{
            text
          }
        },
        _type == 'api.interface' => {
          'type': 'interface',
          name,
          releaseTag,
          extends,
          typeParameters,
          members{
            name,
            optional,
            releaseTag,
            tokens[]->{
              text
            }
          }
        },
        _type == 'api.type' => {
          'type': 'type',
          name,
          releaseTag,
          tokens[]->{
            text
          }
        }
      }
    }
  }[0]
`
