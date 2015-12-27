describe('rg-toggle', function() {
  let tag, spy, toggle

  beforeEach(function() {
    spy = sinon.spy()
    toggle = new rg.Toggle({
      checked: false
    }).on('toggle', spy)
    $('body').append('<rg-toggle></rg-toggle>')
    tag = riot.mount('rg-toggle', {
      toggle
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has an unchecked checkbox', function() {
    $('rg-toggle input[type=checkbox]').is(':checked').should.be.false
  })

  it('has a checked checkbox', function() {
    toggle.checked = true
    toggle.update()
    $('rg-toggle input[type=checkbox]').is(':checked').should.be.true
  })

  it('calls ontoggle when toggled', function() {
    $('rg-toggle input[type=checkbox]').click()
    spy.should.have.been.called
  })
})
