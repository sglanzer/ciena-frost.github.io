export default function () {
  var duration = 500

  this.transition(
    this.fromRoute('contributing.contributors.contributors'),
    this.toRoute('contributing.contributors.contributor'),
    this.use('explode', {
      matchBy: 'data-contributor-id',
      use: ['flyTo', {
        duration
      }]
    }, {
      use: ['toLeft', {
        duration
      }]
    }),
    this.reverse('explode', {
      matchBy: 'data-contributor-id',
      use: ['flyTo', {
        duration
      }]
    }, {
      use: ['toRight', {
        duration
      }]
    })
  )

  this.transition(
    this.inHelper('liquid-if'),
    this.toModel(true),
    this.use('toUp'),
    this.reverse('toDown')
  )
}