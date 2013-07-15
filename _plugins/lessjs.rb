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
      less_themes     = site.config['less']['themeList']
      less_themePath  = site.config['less']['themePath'] + '/'
      less_cssPath    = site.config['less']['themePath'] + '/'
      less_bin        = site.config['less']['bin'] || 'lessc'
      
      for less_theme in less_themes
        FileUtils.mkdir_p(less_cssPath)
          begin
            command = [less_bin, ' -x ',
                       less_themePath + less_theme + '/index.less',
                       ' > ',
                       less_cssPath + less_theme + '.css'
                      ].join(' ')
            
            puts 'Compiling LESS: ' + command
            puts `#{command}`
            raise "LESS compilation error" if $?.to_i != 0
          end
          
          # Add this output file so it won't be "cleaned away"
          site.static_files << CssFile.new(site, site.source, less_cssPath, less_theme + '.css')
      end
    end
  end
end
