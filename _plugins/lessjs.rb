module Jekyll

  class CssFile < StaticFile
    def write(dest)
      dest_path = destination(dest)
      FileUtils.mv(path, dest_path)
    end
  end

  class LessJsGenerator < Generator
    safe true
    priority :low
    
    def generate(site)
      less_path = site.config['less']['path']
      css_path = site.config['less']['path']
      lessc_bin = site.config['less']['bin'] || 'lessc'
      
      FileUtils.mkdir_p(css_path)
        begin
          command = [lessc_bin, ' -x ',
                     less_path + '/index.less',
                     ' > ',
                     css_path + '/index.css'
                    ].join(' ')
          
          puts 'Compiling LESS: ' + command
          puts `#{command}`
          raise "LESS compilation error" if $?.to_i != 0
        end
        
        # Add this output file so it won't be "cleaned away"
        site.static_files << CssFile.new(site, site.source, css_path, 'index.css')
    end
  end
end
