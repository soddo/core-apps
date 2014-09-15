<%
    ui.decorateWith("referenceapplication", "standardEmrPage")
    ui.includeCss("coreapps", "findpatient/findPatient.css")
    ui.includeCss("uicommons", "datatables/dataTables_jui.css")
    ui.includeJavascript("uicommons", "datatables/jquery.dataTables.min.js")
    ui.includeJavascript("coreapps", "findpatient/patientSearchWidget.js")
    ui.includeJavascript("uicommons", "moment.min.js")
%>
<script type="text/javascript">
<% if (breadcrumbs) { %>
    var breadcrumbs = ${ breadcrumbs };
<% } else { %>
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message(label)}"}
    ];
<% } %>

    jq(function() {
        jq('#patient-search').focus();
    });

</script>

<h2>
	${ ui.message(heading) }
</h2>

${ ui.includeFragment("coreapps", "patientsearch/patientSearchWidget",
        [ afterSelectedUrl: afterSelectedUrl,
          showLastViewedPatients: showLastViewedPatients ])}
