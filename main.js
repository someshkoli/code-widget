#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

class Application {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jstextview'
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this._window.present();
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
		//this._initMenus();
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {
		this.test="initial";
        // Create the application window
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            title: "Enter code HERE",
            default_height: 400,
            default_width: 440,
            border_width: 20 });
        // Text view plugin
        this.buffer = new Gtk.TextBuffer();
        this._textView = new Gtk.TextView ({
            buffer: this.buffer,
            editable: true,
            wrap_mode: Gtk.WrapMode.WORD });
		//menu option vlue
		this._test = new Gtk.Label ({
            label: this.test,
            wrap: true });
        // SCroll winfow for text box
        this._scrolled = new Gtk.ScrolledWindow ({
            hscrollbar_policy: Gtk.PolicyType.AUTOMATIC,
            vscrollbar_policy: Gtk.PolicyType.AUTOMATIC,
            shadow_type: Gtk.ShadowType.ETCHED_IN,
            height_request: 180,
            width_request: 400, });
        this._scrolled.add_with_viewport (this._textView);
		
		//Buton
		this._send = new Gtk.Button ({
            halign: Gtk.Align.END,
            margin_top: 20,
            label: "compile and run" ,});
        
        
        //subGrid    
        this._grid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER });
        this._grid.attach (this._test, 0, 0, 1, 1);
        this._grid.attach (this._scrolled, 0, 1, 1, 1);

		//main grid
		this._mainGrid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER });
		this._mainGrid.attach (this._grid, 0, 0, 1, 1);
        this._mainGrid.attach (this._send, 0, 1, 1, 1);
        // Attach the main grid to the window
        this._window.add (this._mainGrid);

        // Show the window and all child widgets
        this._window.show_all();
    }
    //Language menu
        _showNew() {
    	    print("This doesn't do anything. It is only a demonstration.");
    	}

    	_showAbout() {
        	print("No AboutDialog here.  This is only a demonstration.");
    	}
        _initMenus(){
		    let menu = new Gio.Menu();
		    menu.append("New",'app.new');
		    menu.append("About", 'app.about');
		    menu.append("Quit",'app.quit');
		    this.application.set_app_menu(menu);

		    let newAction = new Gio.SimpleAction ({ name: 'new' });
		    newAction.connect('activate', () => { this._showNew(); });
		    this.application.add_action(newAction);

		    //let aboutAction = new Gio.SimpleAction ({ name: 'about' });
		    //aboutAction.connect('activate', () => { this._showAbout(); });
		    //this.application.add_action(aboutAction);

		    //let quitAction = new Gio.SimpleAction ({ name: 'quit' });
		    //quitAction.connect('activate', () => { this._window.destroy(); });
		    //this.application.add_action(quitAction);
   		}
};

// Run the application
let app = new Application ();
app.application.run (ARGV);
