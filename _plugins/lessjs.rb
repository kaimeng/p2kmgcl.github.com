module Jekyll

  class CssFile < StaticFile
    def write(dest)
      dest_path = destination(dest)
      FileUtils.cp(path, dest_path)
    end
  end

  class LessJsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      themes    = site.config['less']['themeList']
      themePath = site.config['less']['themePath'] + '/'
      modules   = site.config['less']['themeModules']
      bin       = site.config['less']['bin'] + ' -x '

      puts ''
      for theme in themes
        curLess = themePath + theme + '/build_less/';
        curCSS = themePath + theme + '/build_css/';
        printf "\nCompiling theme " + theme + "\n:"
        for themeModule in modules
          command = bin + curLess + themeModule + '.less > ' + curCSS + themeModule + '.css'
          printf "\tGenerating " + themeModule + ' module. ' + `#{command}` + "\n"
          raise "LESS compilation error" if $?.to_i != 0
          site.static_files << CssFile.new(site, site.source, curCSS, themeModule + '.css')
        end
        printf "\tdone."
      end
    end
  end
end
