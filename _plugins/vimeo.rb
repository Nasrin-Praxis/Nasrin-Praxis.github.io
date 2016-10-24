# A plugin for embedding videos from Vimeo using a simple Liquid tag, ie: {% vimeo 12345678 %}.
# Based of the Youtube plugin from http://www.portwaypoint.co.uk/jekyll-youtube-liquid-template-tag-gist/

module Jekyll
  class Vimeo < Liquid::Tag
    def initialize(name, id, tokens)
      super
      @id = id.strip
    end

    def render(context)
      %(
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" width="560" height="315" src="http://player.vimeo.com/video/#{@id}" frameborder="0" allowfullscreen>
  </iframe>
</div>
      )
    end
  end
end

Liquid::Template.register_tag('vimeo', Jekyll::Vimeo)