var NotificationCenter = new (function() {
	var m_message_listners = [];
	
	this.postNotification = function(p_message, options) {
		//console.log(p_message);
		if (m_message_listners[p_message]) {
			for(var callback_idx in m_message_listners[p_message]) {
				m_message_listners[p_message][callback_idx](p_message, options);
			}
		}
	}
	
	this.addObserver = function(p_for_message, p_callback) {
		if (!m_message_listners[p_for_message]) m_message_listners[p_for_message] = [];
		m_message_listners[p_for_message].push(p_callback);
	}
})();
var NC = NotificationCenter;

function NotificationCenterTest() {
	NotificationCenter.addObserver("TEST_MSG", function(msg, options){
		alert("Got Message: "+msg);
	});
	
	NotificationCenter.postNotification("TEST_MSG", {});
	NotificationCenter.postNotification("TEST_MSG2", {a:1});
}